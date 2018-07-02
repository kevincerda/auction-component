import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('http://localhost:2106/api/auction/product', {
    params: props
  });
}

export default postWatcher;