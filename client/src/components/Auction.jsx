import React from 'react';
import axios from 'axios';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import styles from './Auction.css';

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
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
    axios.get('/api/auction/product/id/' + this.state.id)
    .then(({ data }) => {
      let endDate = moment(data.createdAt).add(7, 'days');
      let timeLeft = moment.duration(endDate.diff(moment()));

      this.setState({
        id: data.id,
        name: data.name,
        condition: data.condition,
        minimum: data.minimum,
        watchers: data.watchers,
        daysLeft: timeLeft.days(),
        hoursLeft: timeLeft.hours(),
        secondsLeft: timeLeft.seconds(),
        endDate: endDate.format('dddd, h:mmA')
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
      let bidCount = data[0] + ' bid';
      if (data[0] > 1) {
        bidCount = data[0] + ' bids';
      }
      this.setState({
        bids: bidCount,
        currentBid: data[1].toFixed(2)
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
    } else if (!this.state.secondsLeft) {
      alert ('This auction has ended');
    } else {
      axios.post('/api/auction/bid', {
        id: this.state.id,
        bidAmount: this.state.bidAmount
      }).then(data => {
        let bidCount = data.bids + ' bid';
        if (data[0] > 1) {
          bidCount = data.bids + ' bids';
        }
        this.setState({
          bids: bidCount,
          currentBid: data.currentBid
        })
      }).catch(err => {
        console.log('error submitting bid', err);
      })
    }
  }

  addWatcher() {
    axios.post('/api/auction/product/id/' + this.state.id)
    .then(data => {
      this.componentDidMount();
    }).catch(err => {
      console.log('we\'re sorry, there was an error when trying to add this item to your watchlist');
    })
  }

  render() {
    return (
      <div styleName="auction-container">
        <div styleName="item-name">{this.state.name}</div><hr />
        <div styleName="info-container">
          <div>
            <div styleName="col-1">Condition: </div>
            <div styleName="col-2"><div styleName="condition">{this.state.condition}</div></div>
          </div>
          <div>
            <div styleName="col-1">Time left: </div>
            <div styleName="end-time">{this.state.daysLeft}d {this.state.hoursLeft}h <span styleName="end-date">{this.state.endDate}</span></div>
          </div>
        </div>
        <div styleName="bid-container">
          <div>
            <div styleName="col-1">Current bid: </div>
            <div styleName="col-2"><span styleName="current-bid">${this.state.currentBid}</span></div>
            <div styleName="col-3">[ <a href="#">{this.state.bids}</a> ]</div>
          </div>
          <div styleName="bid-form">
            <form onSubmit={this.handleBidSubmit}>
              <div styleName="col-1"></div>
              <div styleName="col-2"><input styleName="bid-input" onChange={this.handleBidChange}/></div>
              <div styleName="col-3"><button styleName="place-bid">Place bid</button></div>
            </form>
          </div>
          <div>
            <div styleName="col-1"></div>
            <div styleName="col-2"><span styleName="instruction">Enter ${Number(this.state.currentBid) + 0.01} or more</span></div>
            <div styleName="col-3"></div>
          </div>
          <div>
            <div styleName="col-1"></div>
            <div styleName="col-2"></div>
            <div styleName="col-3">
              <button styleName="add-watcher" onClick={this.addWatcher}><i class="fa fa-eye"></i>    Add to watch list</button>
            </div>
          </div>
          <div styleName="watchers">{this.state.watchers} watchers</div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Auction, styles);