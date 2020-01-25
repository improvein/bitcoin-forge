# Bitcoin Forge

<img src="/src/web/images/bf_logo.svg" alt="BF logo" width="70" height="70">

This project intends to be an **offline** suite of tools for low-level operations with Bitcoin, like forging transactions or tinker with scripts.

The core features are developed using [BitcoinJS (bitcoinjs-lib)](https://github.com/bitcoinjs/bitcoinjs-lib).

The Miniscript features are developed using code taken from http://bitcoin.sipa.be/miniscript/ (designed and implemented by Pieter Wuille, Andrew Poelstra, and Sanket Kanjalkar).

The front-end is developed mainly using [React](https://reactjs.org), [Bootstrap](https://getbootstrap.com) and [other libraries](https://github.com/improvein/bitcoin-forge/blob/master/package.json)

## Features
Some things that can be done with this toolkit:
* Transactions
  * Create a transaction by defining the inputs and outputs specifically
  * Deconde a transaction from it's raw hexa
* Address
  * Create an address in different formats given the public key(s) or redeem script
* Scripts
  * Decompile the script ASM given the raw hexa notation
  * Create a script manually by adding values or OPCODES to the stack
  * Create a script using the [Miniscript](http://bitcoin.sipa.be/miniscript/) notation

## Web (online) version
You can use the already compiled version at https://improvein.github.io/bitcoin-forge/

Even if that version is published online, it should work offline without issues.

The online version does not have any analytics tool that tracks trafic, except of what GitHub might do on the server side.

## Local version
The project should run locally without internet connection. That is why you can run the local version with the files under the [dist](https://github.com/improvein/bitcoin-forge/tree/master/dist) folder

## Build and Run
You can build your own version and run it.

First, download the project
```
git clone https://github.com/improvein/bitcoin-forge.git
```

Then, install dependencies
```
npm install
```

Finally, you can either build the project into the `dist` folder (using [webpack](https://webpack.js.org/))
```
npm run buildweb
```
or start a local server (using [webpack dev server](https://github.com/webpack/webpack-dev-server))
```
npm run startweb
```

## Contribute
Contributions and always welcome and much appreciated!

You can report bugs or post suggestions:<br/>
https://github.com/improvein/bitcoin-forge/issues

Or, if you know your way around code, you can propose changes and push a Pull Request:<br/>
https://github.com/improvein/bitcoin-forge/pulls
