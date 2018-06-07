import axios from 'axios';

const postBid = (props) => {
  return axios.post('/api/auction/bid', {
    id: props.id,
    inputBid: props.inputBid
  });
}

export default postBid;