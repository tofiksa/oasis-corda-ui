import axios from "axios";
import {BASE_OAS_API_URL} from '../config/url'

const api = axios.create({
    baseURL: BASE_OAS_API_URL,
  });

class TransferService {

  transfer(from,to,amount,tokensymbol) {
  return api({
    method: 'post',
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      url: 'TransferTokensAsync',
      params: { 
        from: from,
        to: to,
        amount: amount,
        tokensymbol: tokensymbol
           },
      data: {
          from: from,
          to: to,
          amount: amount,
          tokensymbol: tokensymbol
      }
  }).then((response) => {
    if(response.status === 200) {
      console.log(response);
    }
    }).catch((error) => {
      console.log(Promise.reject(error));
    });
}

}

export default new TransferService();