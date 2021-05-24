import React, { Component } from 'react';
import {BASE_API_URL} from '../config/url'
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
});

class Accounts extends Component {

  state = {
    accounts: [],
    tokenUriBalanceMap: [],
    authString: ''
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
          //console.log("ACCOUNTS: ",res.data);
          this.setState({ accounts: res.data})
          localStorage.setItem("accounts",JSON.stringify(res.data))
        });
        
      } else {
        console.log("notin in da bucket!!")
      }

    
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(accounts);  
    accounts.map( account => 
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
    
    return (
      
      <div className={"container"}>
        <div>
        {this.state.accounts.map(address => 
        <a key={address.address.uri} href={'/account/'+address.address.accountId}><p>{address.address.accountId}</p></a>
        )}
        </div>
        
      </div>
      
    );
  }
  
  }


export default Accounts;