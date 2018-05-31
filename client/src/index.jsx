import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      condition: '',
      price: 0.00,
      minimum: 0.00,
      bids: 0,
      watchers: 0,
      endtime: '0d0h'
    }
  }

  componentDidMount() {
    axios.get('/api/auction')
      .then(data => {
        
      })
  }

  render() {
    return (
      <div>
        <div id="name">{this.state.name}</div>
        <div id="condition">{this.state.condition}</div>
        <form id="bid-form">
          <input />
          <button>Make Offer</button>
        </form>
        <div id="price">Current Price: {this.state.price}</div>
        <div id="minimum">{this.state.minimum}</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));