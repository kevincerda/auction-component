import axios from 'axios';

const getBids = (props) => {
  return axios.get(`/api/auction/bid/${props.id}`)
}

export default getBids;