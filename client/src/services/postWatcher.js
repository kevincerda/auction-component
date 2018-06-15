import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('/api/auction/product', {
    params: props
  });
}

export default postWatcher;