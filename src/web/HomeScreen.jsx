import React from 'react';

const HomeScreen = () => (
  <div>
    <h1>Welcome to the Bitcoin Forge</h1>
    <p>
      This project intends to be a suite of tools for low-level operations with Bitcoin, like
      forging transactions or tinker with scripts.
    </p>
    <h2>Features</h2>
    <p>These are some of the things you can do with <strong>Bitcoin Forge</strong>:</p>
    <ul>
      <li>Transactions
        <ul>
          <li>Create a transaction by defining the inputs and outputs specifically</li>
          <li>Deconde a transaction from it's raw hexa</li>
        </ul>
      </li>
      <li>Address
        <ul>
          <li>Create an address in different formats given the public key(s) or redeem script</li>
        </ul>
      </li>
      <li>Scripts
        <ul>
          <li>Decompile the script ASM given the raw hexa notation</li>
          <li>Create a script manually by adding values or OPCODES to the stack</li>
        </ul>
      </li>
    </ul>
    <h2>Development notes</h2>
    <p>
      This web front-end is developed using <a href="https://reactjs.org">React</a>
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
    <p>
      Feel free to <strong>report an issue</strong> or <strong>collaborate</strong> on the GitHub project:
      <br />
      <a href="https://github.com/improvein/bitcoin-forge">
        https://github.com/improvein/bitcoin-forge
      </a>
    </p>
  </div>
);

export default HomeScreen;
