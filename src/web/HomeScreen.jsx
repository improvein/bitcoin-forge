import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeScreen = () => (
  <div>
    <h1>Welcome to the Bitcoin Forge</h1>
    <p>
      This project intends to be an
      {' '}
      <strong>offline</strong>
      {' '}
suite of tools for low-level operations
      with Bitcoin, like forging transactions or tinker with scripts.
    </p>
    <h2>Features</h2>
    <p>
      These are some of the things you can do with
      {' '}
      <strong>Bitcoin Forge</strong>
:
    </p>
    <ul>
      <li>
        Transactions
        <ul>
          <li>Create a transaction by defining the inputs and outputs specifically</li>
          <li>Deconde a transaction from it's raw hexa</li>
        </ul>
      </li>
      <li>
        Address
        <ul>
          <li>Create an address in different formats given the public key(s) or redeem script</li>
        </ul>
      </li>
      <li>
        Scripts
        <ul>
          <li>Decompile the script ASM given the raw hexa notation</li>
          <li>Create a script manually by adding values or OPCODES to the stack</li>
          <li>
            Create a script by using
            {' '}
            <a href="http://bitcoin.sipa.be/miniscript/">Miniscript</a>
            {' '}
            notation
          </li>
        </ul>
      </li>
      <li>
        Cryptography
        <ul>
          <li>Hash a message or a binary content (in hex) with different algorithms</li>
          <li>Generate private and public keys using ECDSA. Sign content.</li>
        </ul>
      </li>
    </ul>
    <p>
      This toolkit can run 100% offline, since everyting is executed on the browser once it's
      loaded.
    </p>
    <h2>Development notes</h2>
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
      <FontAwesomeIcon
        icon="exclamation-triangle"
        className="ml-1"
        title="be careful of 3rd party libraries"
      />
      .
    </p>
    <p>
      The core Bitcoin features are developed using
      {' '}
      <a href="https://github.com/bitcoinjs/bitcoinjs-lib">BitcoinJS (bitcoinjs-lib)</a>
.
    </p>
    <p>
      The Miniscript features are developed using code taken from
      {' '}
      <a href="http://bitcoin.sipa.be/miniscript/">http://bitcoin.sipa.be/miniscript/</a>
      .
      <br />
      <small>
        Miniscript was designed and implemented by Pieter Wuille, Andrew Poelstra, and Sanket
        Kanjalkar.
      </small>
    </p>
    <p>
      Feel free to
      {' '}
      <strong>report an issue</strong>
      {' '}
or
      {' '}
      <strong>collaborate</strong>
      {' '}
on the GitHub
      project:
      <br />
      <a href="https://github.com/improvein/bitcoin-forge">
        https://github.com/improvein/bitcoin-forge
      </a>
    </p>
  </div>
);

export default HomeScreen;
