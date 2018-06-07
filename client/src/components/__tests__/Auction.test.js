import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount } from 'enzyme';
import Auction from '../Auction.jsx';

describe('componentDidMount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls componentDidMount on mount', () => {
    const spy = jest.spyOn(Auction.prototype, 'componentDidMount');
    const auction = mount(<Auction />);
    expect(spy).toHaveBeenCalledTimes(1);
    auction.unmount();
  });

  it('calls fetchProductInfo on componentDidMount', () => {
    const spy = jest.spyOn(Auction.prototype, 'fetchProductInfo');
    const auction = mount(<Auction />);
    expect(spy).toHaveBeenCalledTimes(1);
    auction.unmount();
  });
});

describe('fetchProductInfo', () => {
  it('fetches product info correctly', done => {
    
    const data = {
      data: { id: 1, name: 'sampleProduct', condition: 'new', minimum: 10.00, watchers: 3, createdAt: new Date() }
    };

    mock.onGet('/api/auction/product/id', { params: { id: '1' } }).reply(() => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          resolve(data);
        }, 100);
      })
    });

    const auctionWrapper = mount(<Auction />);
    const instance = auctionWrapper.instance();

    console.log(instance.fetchProductInfo)

    return instance.fetchProductInfo().then((productInfo) => {
      return expect(productInfo).toEqual(data);
      done();
    }).catch(err => {
      console.log('error fetching product info in test', err);
    });

    auctionWrapper.unmount();
  });

  it('calls fetchBids on fetchProductInfo', () => {
    const spy = jest.spyOn(Auction.prototype, 'fetchBids');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });
});

describe('fetchBids', () => {

});

describe('addWatcher', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it('simulates click events', () => {
    const spy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auction = shallow(<Auction />);
    auction.find('.add-watcher').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
