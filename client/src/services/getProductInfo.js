import axios from 'axios';

const getProductInfo = () => {
  return axios.get('/api/auction/product/id', {
    params: {
      id: 1
    }
  });
};

export default getProductInfo;