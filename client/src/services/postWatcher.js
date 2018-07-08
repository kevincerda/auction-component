import axios from 'axios';

const postWatcher = (props) => {
  return axios.post(`/api/auction/product/${props.id}`)
}

export default postWatcher;