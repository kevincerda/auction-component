import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get('http://13.57.185.191:9000/api/auction/product', {
    params: props
  });
};

export default getProductInfo;