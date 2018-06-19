import axios from 'axios';

const getBids = (props) => {
  return axios.get('http://18.144.32.186:9000/api/auction/bid', {
    params: props
  });
}

export default getBids;