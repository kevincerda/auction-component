import axios from 'axios';

const getBids = (props) => {
  return axios.get('http://13.57.185.191:9000/api/auction/bid', {
    params: props
  });
}

export default getBids;