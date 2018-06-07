import React from 'react';
import axios from 'axios';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import styles from './Auction.css';
import getProductInfo from '../services/getProductInfo';
import getBids from '../services/getBids';
import postBid from '../services/postBid';

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: '',
      condition: '',
      minimum: 0,
      watchers: 0,
      daysLeft: 0,
      hoursLeft: 0,
      secondsLeft: 0,
      endDate: '',
      inputBid: '',
      bidCount: '',
      currentBid: ''
    }
    this.fetchProductInfo = this.fetchProductInfo.bind(this);
    this.fetchBids = this.fetchBids.bind(this);
    this.handleBidChange = this.handleBidChange.bind(this);
    this.handleBidSubmit = this.handleBidSubmit.bind(this);
    this.addWatcher = this.addWatcher.bind(this);
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  fetchProductInfo() {
    getProductInfo().then(({ data }) => {
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
      this.fetchBids();
    }).catch(err => {
      console.log('error fetching product data', err);
    })
  }

  fetchBids() {
    getBids().then(({ data }) => {
      let bidCount = `${data[0]} bid`;
      if (data[0] > 1) {
        bidCount = `${data[0]} bids`;
      }
      this.setState({
        bidCount: bidCount,
        currentBid: data[1].toFixed(2)
      })
    }).catch(err => {
      console.log('error fetching product bidCount', err);
    })
  }

  handleBidChange(e) {
    this.setState({
      inputBid: e.target.value
    }, () => console.log('this.state.inputBid =', this.state.inputBid))
  }

  handleBidSubmit() {
    let regex = /^[1-9]\d*(?:\.\d{0,2})$/;
    if (!this.state.secondsLeft) {
      alert ('This auction has ended');
    } else if (!regex.test(this.state.inputBid)) {
      alert ('Please enter a valid bid amount')
    } else if (this.state.inputBid < this.state.minimum) {
      alert ('Invalid bid, your bid is below the minimum');
    } else if (this.state.inputBid < this.state.currentBid) {
      alert ('Invalid bid, your bid is lower than the current bid');
    } else {
      postBid({
        id: this.state.id,
        inputBid: this.state.inputBid
      }).then(() => {
        this.fetchBids();
      }).catch(err => {
        console.log('error submitting bid', err);
      })
    }
  }

  addWatcher() {
    axios.post('/api/auction/product/id', {
      params: {
        id: this.state.id
      }
    }).then(data => {
      this.fetchProductInfo();
    }).catch(err => {
      console.log('There was an error trying to add this item to your watchlist');
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
            <div styleName="col-3">[ <a href="#">{this.state.bidCount}</a> ]</div>
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
              <button styleName="add-watcher" onClick={this.addWatcher}><i className="fa fa-eye"></i>    Add to watch list</button>
            </div>
          </div>
          <div styleName="watchers">{this.state.watchers} watchers</div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Auction, styles);