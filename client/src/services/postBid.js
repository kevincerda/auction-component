import axios from 'axios';

const postBid = (props) => {
  return axios.post('ec2-13-57-185-191.us-west-1.compute.amazonaws.com/api/auction/bid', {
    id: props.id,
    bidInput: props.bidInput
  });
};

export default postBid;