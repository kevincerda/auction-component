import axios from 'axios';

const getBids = (props) => {
  return axios.get('/api/auction/bid', {
    params: props
  });
}

export default getBids;