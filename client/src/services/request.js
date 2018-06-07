import axios from 'axios';

const getProduct = () => {
  return axios.get('/api/auction/product/id', {
    params: {
      id: 1
    }
  });
}

export default getProduct;