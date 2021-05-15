import React from 'react';
import {BASE_API_URL} from '../config/url'
import axios from "axios";

function About () {

    const api = axios.create({
        baseURL: BASE_API_URL,
      });
    
    let authentication = "{\"username\":\"oasis-corner\",\"password\":\"kQmI5U2HngmX1oLc\"}";

    const CovidRegistrationActions = async () => {

        axios({
            method: 'post',
            url: 'https://oasis-corner.lab577.co.uk/api/rest/auth/login',
            data: {
                username: 'oasis-corner',
                password: 'kQmI5U2HngmX1oLc'
            }
          }).then((response) => {
              
              if(response.status === 200) {
                console.log(response);  
              }
            }).catch((error) => {
              console.log(Promise.reject(error));
            });
      };

      CovidRegistrationActions();

  
  return (
      
    <div className={"container"}>
      <h1>Om oss</h1>
      
    </div>
  );
}

export default About;