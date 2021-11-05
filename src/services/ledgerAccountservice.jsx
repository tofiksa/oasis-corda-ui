import axios from "axios";
import {BASE_OAS_API_URL} from '../config/url'

const api = axios.create({
    baseURL: BASE_OAS_API_URL,
  });

class LedgerAccountService {

  ledgerAccount() {
  return api({
    method: 'get',
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      url: 'GetAccountsResultsAsync'
      
  }).then((response) => {
    if(response.status === 200) {
      console.log(response);
    }
    }).catch((error) => {
      console.log(Promise.reject(error));
    });
}

}

export default new LedgerAccountService();