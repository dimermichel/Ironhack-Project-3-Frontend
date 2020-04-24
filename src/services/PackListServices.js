import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL;

console.log(baseURL);

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const PACKLIST_SERVICE = {
  defaultList() {
    return service.get('/api/defaultlist');
  },
};

export default PACKLIST_SERVICE;
