import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount } from 'enzyme';
import Auction from '../Auction.jsx';
// jest.mock('../Auction.jsx');

describe('componentDidMount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls componentDidMount on mount', () => {
    const spy = jest.spyOn(Auction.prototype, 'componentDidMount');
    const wrapper = mount(<Auction />);
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('calls fetchProductInfo on componentDidMount', () => {
    const spy = jest.spyOn(Auction.prototype, 'fetchProductInfo');
    const wrapper = mount(<Auction />);
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});

describe('fetchProductInfo', () => {
  beforeEach(() => {
    const mock = new MockAdapter(axios);
    const data = {
      id: 1,
      name: 'sampleProduct',
      condition: 'new',
      minimum: 10.00,
      watchers: 3,
      createdAt: new Date()
    };
    mock.onGet('localhost:8000/api/auction/product/id/1').reply(200, data);
  })

  it('fetches product info on fetchProductInfo', done => {
    fetchProductInfo().then(response => {
      expect(response).toEqual(data);
      done();
    })
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
    const wrapper = shallow(<Auction />);
    wrapper.find('.add-watcher').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
