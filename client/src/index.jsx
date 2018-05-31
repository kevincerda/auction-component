import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bidAmount: 0,
      name: '',
      condition: '',
      price: 0.00,
      minimum: 0.00,
      bids: 0,
      watchers: 0,
      endtime: '0d0h'
    }
    this.componentDidMount = this.bind.componentDidMount(this);
    this.handleChange = this.bind.handleChange(this);
    this.handleSubmit = this.bind.handleSubmit(this);
    this.addWatcher = this.bind.addWatcher(this);
  }

  componentDidMount() {
    axios.get('/api/auction', {
      name: 'Eachine E58 2MP 720P Camera WIFI FPV Foldable Drone 2.4G 6-Axis RC Quadcopter'
    }).then(({ data }) => {
      this.setState({
        name: data.name,
        condition: data.condition,
        minimum: data.minimum,
        watchers: data.watchers,
        endtime: data.endtime
      })
    }).catch(err => {
      console.log('error fetching product data', err);
    })
  }

  handleBidChange(e) {
    this.setState({
      bidAmount: e.target.value
    }, () => console.log('this.state.bidAmount =', this.state.bidAmount))
  }

  handleBidSubmit() {
    axios.post('/api/auction/bid', {
      name: this.state.name,
      bidAmount: this.state.bidAmount
    }).then(success => {
      if (success) {
        axios.get('/api/auction/bid')
          .then(({ data }) => {
            this.setState({
              price: data.amount,
              bids: data.bids
            })
          })
      }
    }).catch(err => {
      console.log('error submitting bid', err);
    })
  }

  addWatcher() {
    axios.post('/api/auction', {
      name: this.state.name
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
        <div id="watchers">{this.state.watchers}</div>
        <div id="condition">{this.state.condition}</div>
        <form id="bid-form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}/>
          <button>Make Offer</button>
        </form>
        <div id="bids">Bids made: {this.props.bids}</div>
        <div id="price">Current Price: {this.state.price}</div>
        <div id="minimum">{this.state.minimum}</div>
        <div id="endtime">{this.state.endtime}</div>
        <div id="watchers-button">
          <button onClick={this.addWatcher}>Watch this item</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));