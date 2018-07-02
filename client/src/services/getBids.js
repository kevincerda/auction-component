import axios from 'axios';

const getBids = (props) => {
  return axios.get(`http://localhost:2106/api/auction/bid/${props.id}`);
}

export default getBids;