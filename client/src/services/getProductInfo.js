import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get(`http://localhost:2106/api/auction/product/${props.id}`);
};

export default getProductInfo;