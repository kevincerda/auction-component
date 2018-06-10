import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get('/api/auction/product', {
    params: props
  });
};

export default getProductInfo;