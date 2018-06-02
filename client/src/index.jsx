import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      condition: '',
      currentBid: 0,
      minimum: 0,
      watchers: 0,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      bids: 0,
      bidAmount: 0
    }
    this.fetchProductInfo = this.fetchProductInfo.bind(this);
    this.fetchProductBids = this.fetchProductBids.bind(this);
    this.handleBidChange = this.handleBidChange.bind(this);
    this.handleBidSubmit = this.handleBidSubmit.bind(this);
    this.addWatcher = this.addWatcher.bind(this);
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  fetchProductInfo() {
    axios.get('/api/auction')
    .then(({ data }) => {
      const day = 24 * 60 * 60 * 1000;
      const hour = 60 * 60 * 1000;
      const minute = 60 * 1000;

      let end = new Date(Date.parse(data.createdAt));
      end.setDate(end.getDate() + 7);
      let timeLeft = Math.floor((end - new Date()));
      let daysLeft = Math.floor(timeLeft / day);
      let hoursLeft = Math.floor((timeLeft - daysLeft * day) / hour);
      let minutesLeft = Math.floor((timeLeft - daysLeft * day - hoursLeft * hour) / minute);

      this.setState({
        id: data.id,
        name: data.name,
        condition: data.condition,
        minimum: data.minimum,
        watchers: data.watchers,
        daysLeft: daysLeft,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft
      })
    }).then(() => {
      this.fetchProductBids();
    }).catch(err => {
      console.log('error fetching product data', err);
    })
  }

  fetchProductBids() {
    axios.get('/api/auction/bid')
    .then(({ data }) => {
      this.setState({
        bids: data[0],
        currentBid: data[1]
      })
    }).catch(err => {
      console.log('error fetching product bids', err);
    })
  }

  handleBidChange(e) {
    this.setState({
      bidAmount: e.target.value
    }, () => console.log('this.state.bidAmount =', this.state.bidAmount))
  }

  handleBidSubmit() {
    if (this.state.bidAmount < this.state.minimum) {
      alert ('Invalid bid, your bid is below the minimum');
    } else if (this.state.bidAmount < this.state.currentBid) {
      alert ('Invalid bid, your bid is lower than the current bid');
    } else {
      axios.post('/api/auction/bid', {
        id: this.state.id,
        bidAmount: this.state.bidAmount
      }).then(data => {
        this.setState({
          bids: data.bids,
          currentBid: data.currentBid
        })
      }).catch(err => {
        console.log('error submitting bid', err);
      })
    }
  }

  addWatcher() {
    axios.post('/api/auction', {
      id: this.state.id
    }).then(data => {
      console.log('now watching item');
      this.componentDidMount();
    }).catch(err => {
      console.log('we\'re sorry, there was an error when trying to add this item to your watchlist');
    })
  }

  render() {
    return (
      <div>
        <div id="name">{this.state.name}</div>
        <div id="watchers">Watchers: {this.state.watchers}</div>
        <div id="condition">Condition: {this.state.condition}</div>
        <form id="bid-form" onSubmit={this.handleBidSubmit}>
          <input onChange={this.handleBidChange}/>
          <button>Make Offer</button>
        </form>
        <div id="bids">Bids made: {this.state.bids}</div>
        <div id="currentBid">Current Bid: {this.state.currentBid}</div>
        <div id="minimum">Minimum Bid: {this.state.minimum}</div>
        <div id="time-left">Bid Ends In: {this.state.daysLeft} days {this.state.hoursLeft} hrs {this.state.minutesLeft} mins</div>
        <div id="watchers-button">
          <button onClick={this.addWatcher}>Watch this item</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
