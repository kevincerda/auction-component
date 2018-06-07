import axios from 'axios';

const postBid = (props) => {
  return axios.post('/api/auction/bid', {
    id: props.id,
    bidInput: props.bidInput
  });
};

export default postBid;