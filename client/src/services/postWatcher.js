import axios from 'axios';

const postWatcher = (props) => {
  return axios.post('ec2-13-57-185-191.us-west-1.compute.amazonaws.com/api/auction/product', {
    params: props
  });
}

export default postWatcher;