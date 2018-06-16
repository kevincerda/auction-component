import React from 'react';
import ReactDOM from 'react-dom';
import Auction from './components/Auction.jsx';
import Title from './components/Title.jsx';

ReactDOM.render(<Title />, document.getElementById('title'));
ReactDOM.render(<Auction />, document.getElementById('auction'));