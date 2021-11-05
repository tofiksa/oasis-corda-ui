import axios from "axios";
import {BASE_API_URL} from '../config/url'

const api = axios.create({
    baseURL: BASE_API_URL,
  });

class AuthService {

  login(username,password) {
  return api({
    method: 'post',
      url: '/auth/login',
      data: {
          username: username,
          password: password
      }
  }).then((response) => {
    if(response.status === 200) {
      console.log(response);

      localStorage.setItem("authstring","Bearer "+response.data);
    }
    }).catch((error) => {
      console.log(Promise.reject(error));
    });
}

  logout() {
    localStorage.removeItem("authstring");
  }

  hasAuthString() {
    if (localStorage.getItem('authstring'))
      return true;
    else
      return false;
  }
}

export default new AuthService();