# Bitcoin Forge

<img src="/src/web/images/bf_logo.svg" alt="BF logo" width="70" height="70">

This project intends to be a suite of tools for low-level operations with Bitcoin, like forging transactions or tinker with scripts.

The core features are developed using [BitcoinJS (bitcoinjs-lib)](https://github.com/bitcoinjs/bitcoinjs-lib).

The front-end is developed mainly using [React](https://reactjs.org), [Bootstrap](https://getbootstrap.com) and [other libraries](https://github.com/improvein/bitcoin-forge/blob/master/package.json)

## Online version
You can use the already compiled version at https://improvein.github.io/bitcoin-forge/

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
