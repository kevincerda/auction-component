import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get('http://18.144.32.186:9000/api/auction/product', {
    params: props
  });
};

export default getProductInfo;