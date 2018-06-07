import React from 'react';
import { shallow, mount } from 'enzyme';
import Auction from '../Auction.jsx';
jest.mock('../../services/request.js');

describe('AuctionComponent', () => {
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

  it('fetches product info on fetchProductInfo', done => {
    const auction = shallow(<Auction />);

    setTimeout(() => {
      auction.update();
      const state = auction.instance().state;
      expect(state.name).toEqual('sampleProduct');
      expect(state.condition).toEqual('new');
      expect(state.minimum).toEqual(10);
      expect(state.watchers).toEqual(3);
      done();
    })
  });

  it('calls fetchBids on fetchProductInfo', () => {
    const spy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auction = shallow(<Auction />);

    setTimeout(() => {
      auction.update();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    })
  });

  it('fetches bid info on fetchBids', () => {
    
  });

  it('simulates click events', () => {
    const spy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auction = shallow(<Auction />);
    auction.find('.add-watcher').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
