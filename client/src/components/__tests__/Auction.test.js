import React from 'react';
import { shallow, mount } from 'enzyme';
import Auction from '../Auction.jsx';
jest.mock('../../services/getProductInfo');
jest.mock('../../services/getBids');
jest.mock('../../services/postBid');

describe('AuctionComponent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls componentDidMount on mount', () => {
    const componentDidMountSpy = jest.spyOn(Auction.prototype, 'componentDidMount');
    const auctionWrapper = mount(<Auction />);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    auctionWrapper.unmount();
  });

  it('calls fetchProductInfo on componentDidMount', () => {
    const fetchProductInfoSpy = jest.spyOn(Auction.prototype, 'fetchProductInfo');
    const auctionWrapper = mount(<Auction />);
    expect(fetchProductInfoSpy).toHaveBeenCalledTimes(1);
    auctionWrapper.unmount();
  });

  it('calls fetchBids on fetchProductInfo', (done) => {
    const fetchBidsSpy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      expect(fetchBidsSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('fetches product info', (done) => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      const state = auctionWrapper.instance().state;
      expect(state.name).toEqual('sampleProduct');
      expect(state.condition).toEqual('new');
      expect(state.minimum).toEqual(10);
      expect(state.watchers).toEqual(3);
      done();
    });
  });

  it('fetches bids', (done) => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      const state = auctionWrapper.instance().state;
      expect(state.bidCount).toEqual('5 bids');
      expect(state.currentBid).toEqual('100.00');
      done();
    });
  });

  it('simulates onChange events', () => {
    const handleBidChangeSpy = jest.spyOn(Auction.prototype, 'handleBidChange');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.bid-input').simulate('change', { target: { value: 'Changed' } });
    expect(handleBidChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('simulates onSubmit events', () => {
    const handleBidSubmitSpy = jest.spyOn(Auction.prototype, 'handleBidSubmit');
    const auctionWrapper = mount(<Auction />);
    auctionWrapper.find('.place-bid').simulate('submit');
    expect(handleBidSubmitSpy).toHaveBeenCalledTimes(1);
    auctionWrapper.unmount();
  });

  it('simulates click events', () => {
    const addWatcherSpy = jest.spyOn(Auction.prototype, 'addWatcher');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.find('.add-watcher').simulate('click');
    expect(addWatcherSpy).toHaveBeenCalledTimes(1);
  });

  it('handles bid change', (done) => {
    const auctionWrapper = shallow(<Auction />);

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.find('.bid-input').simulate('change', { target: { value: '200.00' } });
      const state = auctionWrapper.instance().state;
      expect(state.bidInput).toEqual('200.00');
      done();
    });
  });

  it('handles bid submit', (done) => {
    const fetchBidsSpy = jest.spyOn(Auction.prototype, 'fetchBids');
    const auctionWrapper = shallow(<Auction />);
    auctionWrapper.instance().setState({ secondsLeft: 10000, bidInput: '200.00' });

    setTimeout(() => {
      auctionWrapper.update();
      auctionWrapper.instance().handleBidSubmit();
      expect(fetchBidsSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('handles adding to watchlist', () => {
    
  });
});
