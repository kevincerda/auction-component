import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('http://localhost:9000/api/auction/product', {
    params: props
  });
}

export default postWatcher;