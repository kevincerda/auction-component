import axios from 'axios';

const postBid = (props) => {
  return axios.post('http://localhost:2106/api/auction/bid', {
    id: props.id,
    bidInput: props.bidInput
  });
};

export default postBid;