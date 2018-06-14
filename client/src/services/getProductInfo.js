import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get('http://localhost:9000/api/auction/product', {
    params: props
  });
};

export default getProductInfo;