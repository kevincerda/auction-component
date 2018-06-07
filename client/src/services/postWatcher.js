import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('/api/auction/product/id', {
    params: {
      id: props.id
    }
  });
}

export default postWatcher;