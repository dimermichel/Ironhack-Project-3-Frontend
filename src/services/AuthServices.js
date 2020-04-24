import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL;

console.log(baseURL);

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const AUTH_SERVICE = {
  signup(userData) {
    console.log('Im beeing called');
    // useData represents the req.body; //userData
    return service.post('/api/signup', userData);
  },

  signupGithub(userData) {
    console.log('Im beeing called');
    // useData represents the req.body; //userData
    return service.get('/auth/github', userData);
  },

  login(userData) {
    return service.post('/api/login', userData);
  },

  logout() {
    return service.get('/api/logout', {});
  },

  isLoggedIn() {
    return service.get('/api/isLoggedIn');
  },
};

export default AUTH_SERVICE;
