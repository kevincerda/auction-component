import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('http://13.57.185.191:9000/api/auction/product', {
    params: props
  });
}

export default postWatcher;