import axios from 'axios';

const postBid = (props) => {
  return axios.post('/api/auction/bids', {
    id: props.id,
    customer: props.customer || 'Ebay Customer',
    bidInput: props.bidInput
  });
};

export default postBid;