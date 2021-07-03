export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('authstring'));
  
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + token }; // for Spring Boot back-end
      //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }