import React, { Component } from 'react';
import {BASE_API_URL} from '../config/url'
import axios from "axios";
import DataTable from './Datatable';

const api = axios.create({
  baseURL: BASE_API_URL,
});

class Projects extends Component {

  state = {
    accounts: [],
    tokenUriBalanceMap: [],
    authString: '',
    rowArray: []
  }

    
  constructor () {
    super();
  }
  
  componentDidMount() {

    api({
      method: 'post',
        url: '/auth/login',
        data: {
            username: 'oasis-corner',
            password: 'kQmI5U2HngmX1oLc'
        }
    }).then((response) => {
      if(response.status === 200) {
        console.log(response);
        this.setState({authString: "Bearer "+response.data});
        localStorage.setItem("authstring","Bearer "+response.data);
      }
      }).catch((error) => {
        console.log(Promise.reject(error));
      });

      if (localStorage.getItem("authstring")) {
        
        api({
          method: 'get',
          headers: {'Authorization': localStorage.getItem("authstring")},
          url: '/ledger/accounts'
        }).then((res) => {
          
          const projectAccounts = [];
          const rowCategories = [];
          var max = 10;
            for (let tags in res.data) {
              //console.log("TAGS: ", res.data[tags].tags);
              for (let value in res.data[tags].tags)
                if (res.data[tags].tags[value].value === 'project') {
                  projectAccounts.push(res.data[tags]);
                  
                }
            }
            
            
            for( let category = 0;category < projectAccounts.length; category++) {
              let rowArr = [];
              rowArr.push(
                <a key={projectAccounts[category].address.uri} href={'/project/'+projectAccounts[category].address.accountId}><p>{projectAccounts[category].address.accountId}</p></a>);
              for ( let value = 0; value < projectAccounts[category].tags.length; value++) {    
                if (projectAccounts[category].tags[value].category !== 'DGL.ID') {
                  if (projectAccounts[category].tags[value].category !== 'Accounttype') {
                    rowArr.push(projectAccounts[category].tags[value].value);
                  }
                }
              }
              rowArr.push((Math.floor(Math.random() * max) + 1)+"%");
              rowCategories.push(rowArr);
            }

            console.log("Innenfor filteredaccount: ",projectAccounts);
            console.log("rows: ", rowCategories);

            this.setState({ accounts: projectAccounts});
            this.setState( { rowArray: rowCategories});
        });
        
      } else {
        console.log("notin in da bucket!!")
      }

    this.state.accounts.map( account => 
      api({
        method: 'get',
        headers: {'Authorization': localStorage.getItem("authstring")},
        url: `/ledger/accounts/${account.address.accountId}/balances`
      }).then((resp) => {
        console.log("balances ", resp.data.tokenUriBalanceMap);
        localStorage.setItem(account.address.accountId,JSON.stringify(resp.data.tokenUriBalanceMap));
        
      }));        
  }

  render () {

    const headings = [
      'Project',
      'Location',
      'Type',
      'Issued',
      'Year',
      'Return',
    ];

    
    return (

      <div className={"container"}>
        <div>
          <DataTable headings={headings} rows={this.state.rowArray} />
        </div>
      </div>
    );
  }
  
  }


export default Projects;