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

  sendList(data) {
    return service.post('/api/list', data);
  },

  externalAPIs(placeId) {
    return service.get(`/api/google/${placeId}`);
  },

  sendTravel(data) {
    return service.post('/api/travel', data);
  },

  detailTravel(id) {
    return service.get(`/api/travel/${id}`);
  },
};

export default PACKLIST_SERVICE;
