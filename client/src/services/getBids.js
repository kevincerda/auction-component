import axios from 'axios';

const getBids = (props) => {
  return axios.get('ec2-13-57-185-191.us-west-1.compute.amazonaws.com/api/auction/bid', {
    params: props
  });
}
export default getBids;