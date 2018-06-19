import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('http://18.144.32.186:9000/api/auction/product', {
    params: props
  });
}

export default postWatcher;