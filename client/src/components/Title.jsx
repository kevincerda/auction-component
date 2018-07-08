import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Title.css';
import getProductInfo from '../services/getProductInfo';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 9999999,
      name: ''
    }
    this.fetchName = this.fetchName.bind(this);
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName() {
    getProductInfo({
      id: this.state.id
    }).then(({ data }) => {
      this.setState({
        id: data.id,
        name: data.name
      })
    })
  }

  render() {
    return (
      <div>
        <div styleName="item-text">{this.state.name}</div>
        <hr />
      </div>
    )
  }
}

export default CSSModules(Title, styles);