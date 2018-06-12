import axios from 'axios';

const getBids = (props) => {
  return axios.get('http://localhost:8000/api/auction/bid', {
    params: props
  });
}

export default getBids;