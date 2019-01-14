const bitcoin = require('bitcoinjs-lib');

let network = bitcoin.networks.bitcoin;

/**
 * Indicates if the services should operate with Testnet
 * @param {boolean} isTestnet
 */
exports.setTestnet = (isTestnet) => {
  network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
};

/**
 * Creates a raw Transaction
 * @param {Object[]} inputs Inputs of the transaction, in order.
 * @param {string} inputs[].txhash Hash/id of the previous transactions.
 * @param {int} inputs[].index Index of the output in the previous tx.
 * @param {string} inputs[].privateKey Private key to sign this input, in WIF.
 * @param {int} inputs[].amount Amount of the UTXO. (at the moment, assumes SegWit)
 * @param {Object[]} outputs Outputs of the transactions, in order.
 * @param {string} outputs[].address Address of the output.
 * @param {string} outputs[].amount Amount of the output.
 */
exports.createTx = (inputs, outputs) => {
  console.log('Start forging TX.');

  const txb = new bitcoin.TransactionBuilder(network);

  // @TODO: what is the version?
  txb.setVersion(1);

  // add the inputs
  console.log('Add the inputs.');
  const inputKeyPairs = [];
  inputs.forEach((input) => {
    // check required properties
    if (!Object.prototype.hasOwnProperty.call(input, 'txhash')) {
      throw new Error('The Tx hash for the input was not found.');
    }
    if (!Object.prototype.hasOwnProperty.call(input, 'index')) {
      throw new Error('The Tx output index for the input was not found.');
    }
    if (!Object.prototype.hasOwnProperty.call(input, 'privateKey')) {
      throw new Error('The Tx output privateKey for the input was not found.');
    }

    txb.addInput(input.txhash, input.index);

    // get the keypair
    const keyPair = bitcoin.ECPair.fromWIF(input.privateKey, network);
    inputKeyPairs.push(keyPair);
  });

  // add the outputs
  console.log('Add the outputs.');
  outputs.forEach((output) => {
    // check required properties
    if (!Object.prototype.hasOwnProperty.call(output, 'address')) {
      throw new Error('The address for the output was not found.');
    }
    if (!Object.prototype.hasOwnProperty.call(output, 'amount')) {
      throw new Error('The amount for the output was not found.');
    }

    txb.addOutput(output.address, output.amount);
  });

  // now sign the inputs
  console.log('Sign the inputs.');
  for (let i = 0; i < inputKeyPairs.length; i += 1) {
    const keyPair = inputKeyPairs[i];

    let isSegWit = false;
    // if the amount of the UTXO for this input is provided, assume SegWit
    // @TODO: this has to be improved
    if (Object.prototype.hasOwnProperty.call(inputs[i], 'amount')) {
      isSegWit = true;
    }

    if (isSegWit) {
      // P2SH-P2WPKH

      const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });
      // this is the P2SH-P2WPKH
      const p2shSegwit = bitcoin.payments.p2sh({ redeem: p2wpkh, network });

      // vin, keyPair, redeemScript, hashType, witnessValue, witnessScript
      txb.sign(i, keyPair, p2shSegwit.redeem.output, null, inputs[i].amount);
    } else {
      // regular standard spending

      // vin, keyPair
      txb.sign(i, keyPair);
    }
  }

  console.log('Build TX.');
  const txBuild = txb.build();
  return txBuild;
};
