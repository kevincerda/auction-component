import React from 'react';
import { shallow, mount } from 'enzyme';
import Auction from '../Auction.jsx';
jest.mock('../../services/getProductInfo');
jest.mock('../../services/getBids');

describe('AuctionComponent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls componentDidMount on mount', () => {
    const componentDidMountSpy = jest.spyOn(Auction.prototype, 'componentDidMount');
    const auction = mount(<Auction />);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    auction.unmount();
  });

  it('calls fetchProductInfo on componentDidMount', () => {
    const fetchProductInfoSpy = jest.spyOn(Auction.prototype, 'fetchProductInfo');
    const auction = mount(<Auction />);
    expect(fetchProductInfoSpy).toHaveBeenCalledTimes(1);
    auction.unmount();
  });

  it('fetches product info on fetchProductInfo', (done) => {
    const auction = shallow(<Auction />);

    setTimeout(() => {
      auction.update();
      const state = auction.instance().state;
      expect(state.name).toEqual('sampleProduct');
      expect(state.condition).toEqual('new');
      expect(state.minimum).toEqual(10);
      expect(state.watchers).toEqual(3);
      done();
    });
  });

  it('calls fetchBids on fetchProductInfo', (done) => {
    const fetchBidsSpy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auction = shallow(<Auction />);

    setTimeout(() => {
      auction.update();
      expect(fetchBidsSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('fetches bid info on fetchBids', (done) => {
    const auction = shallow(<Auction />);

    setTimeout(() => {
      auction.update();
      const state = auction.instance().state;
      expect(state.bids).toEqual('5 bids');
      expect(state.currentBid).toEqual('100.00');
      done();
    });
  });

  it('simulates click events', () => {
    const addWatcherSpy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auction = shallow(<Auction />);
    auction.find('.add-watcher').simulate('click');
    expect(addWatcherSpy).toHaveBeenCalledTimes(1);
  });

  it('simulates onChange events', () => {
    const handleBidChangeSpy = jest.spyOn(Auction.prototype, 'handleBidChange');
    const auction = shallow(<Auction />);
    auction.find('.bid-input').simulate('change', { target: { value: 'Changed' } });
    expect(handleBidChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('simulates onSubmit events', () => {
    const handleBidSubmitSpy = jest.spyOn(Auction.prototype, 'handleBidSubmit');
    const auction = mount(<Auction />);
    auction.find('.place-bid').simulate('submit');
    expect(handleBidSubmitSpy).toHaveBeenCalledTimes(1);
    auction.unmount();
  });
});
