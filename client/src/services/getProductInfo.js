import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get(`/api/auction/product/${props.id}`)
}

export default getProductInfo;