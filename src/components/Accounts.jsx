import React, { Component } from 'react';
import {BASE_API_URL} from '../config/url'
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
});


class Accounts extends Component {

  state = {
    accounts: [],
    balances: [],
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
            api({
              method: 'get',
              headers: {'Authorization': this.state.authString},
              url: '/ledger/accounts'
            }).then((res) => {
              console.log("ACCOUNTS: ",res.data);
              this.setState({ accounts: res.data})
              this.state.accounts.map( account => 
              api({
                method: 'get',
                headers: {'Authorization': this.state.authString},
                url: `/ledger/accounts/${account.address.accountId}/balances`
              }).then((resp) => {
                //console.log("balances ", resp.data.tokenUriBalanceMap);
                this.setState({balances: resp.data})
              }));
            });
          }
        }).catch((error) => {
          console.log(Promise.reject(error));
        });
      }
  render () {
    console.log("testing ", this.state.balances);
    return (
      
      <div className={"container"}>
        <div>Corda Accounts</div>
        {this.state.accounts.map(address => <a key={address.address.uri} href={address.address.accountId}><p>{address.address.accountId}</p></a>)}
        
      </div>
    );
  }
  
  }


export default Accounts;