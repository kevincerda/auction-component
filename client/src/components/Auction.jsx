import React from 'react';
import moment from 'moment';
import CSSModules from 'react-css-modules';
import styles from './Auction.css';
import getProductInfo from '../services/getProductInfo';
import getBids from '../services/getBids';
import postBid from '../services/postBid';
import postWatcher from '../services/postWatcher';

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: '',
      condition: '',
      minimum: '',
      watchers: '',
      daysLeft: '',
      hoursLeft: '',
      secondsLeft: '',
      endDate: '',
      bidInput: '',
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
    getProductInfo({
      id: this.state.id
    }).then(({ data }) => {
      let endDate = moment(data.created).add(60, 'days');
      let timeLeft = moment.duration(endDate.diff(moment()));
      this.setState({
        // id: data.id,
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
    getBids({
      id: this.state.id
    }).then(({ data }) => {
      this.setState({
        // bidCount: bidCount,
        currentBid: data.bid
      })
    }).catch(err => {
      console.log('error fetching product bidCount', err);
    })
  }

  addWatcher() {
    postWatcher({
      id: this.state.id
    }).then(() => {
      this.fetchProductInfo();
    }).catch(err => {
      console.log(err);
    })
  }

  handleBidChange(e) {
    this.setState({
      bidInput: e.target.value
    }, () => console.log('this.state.bidInput =', this.state.bidInput))
  }

  handleBidSubmit() {
    let regex = /^[1-9]\d*(?:\.\d{0,2})$/;
    if (!Number(this.state.secondsLeft)) {
      alert ('This auction has ended');
    } else if (!regex.test(this.state.bidInput)) {
      alert ('Please enter a valid bid amount');
    } else if (Number(this.state.bidInput) < Number(this.state.minimum)) {
      alert ('Invalid bid, your bid is below the minimum');
    } else if (Number(this.state.bidInput) < Number(this.state.currentBid)) {
      alert ('Invalid bid, your bid is lower than the current bid');
    } else {
      postBid({
        id: this.state.id,
        bidInput: this.state.bidInput
      }).then(() => {
        this.fetchBids();
      }).catch(err => {
        console.log('error submitting bid', err);
      })
    }
  }

  render() {
    return (
      <div styleName="auction-container">
        <div styleName="info-bids-container">
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
      </div>
    )
  }
}

export default CSSModules(Auction, styles);