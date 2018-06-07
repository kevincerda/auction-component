import axios from 'axios';

const getBids = () => {
  return axios.get('/api/auction/bid');
}

export default getBids;