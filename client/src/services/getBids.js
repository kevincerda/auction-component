import axios from 'axios';

const getBids = (props) => {
  return axios.get('http://localhost:9000/api/auction/bid', {
    params: props
  });
}

export default getBids;