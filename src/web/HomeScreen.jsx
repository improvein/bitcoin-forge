import React, { Component } from 'react';

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Bitcoin Forge</h1>
        <p>This is the forge with different tools to tinker with Bitcoin.</p>
        <p>
          This web front-end is developed using
          {' '}
          <a href="https://reactjs.org">React</a>
          {', '}
          <a href="https://getbootstrap.com">Bootstrap</a>
          {' and '}
          <a href="https://github.com/improvein/bitcoin-forge/blob/master/package.json">
            some other libraries
          </a>
          .
        </p>
        <p>
          The core Bitcoin features are developed using
          {' '}
          <a href="https://github.com/bitcoinjs/bitcoinjs-lib">BitcoinJS (bitcoinjs-lib)</a>
.
        </p>
      </div>
    );
  }
}
export default HomeScreen;
