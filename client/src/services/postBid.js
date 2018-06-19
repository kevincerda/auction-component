import axios from 'axios';

const postBid = (props) => {
  return axios.post('http://18.144.32.186:9000/api/auction/bid', {
    id: props.id,
    bidInput: props.bidInput
  });
};

export default postBid;