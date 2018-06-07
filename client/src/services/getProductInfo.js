import axios from 'axios';

const getProductInfo = (props) => {
  return axios.get('/api/auction/product/id', {
    params: {
      id: props.id
    }
  });
};

export default getProductInfo;