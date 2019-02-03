import * as Constants from '../model/Constants';

const bitcoin = require('bitcoinjs-lib');

let network = bitcoin.networks.bitcoin;

const TxService = {
  /**
   * Indicates if the services should operate with Testnet
   * @param {boolean} isTestnet
   */
  setTestnet: (isTestnet) => {
    network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
  },

  /**
   * Creates a raw Transaction
   * @param {Object[]} inputs Inputs of the transaction, in order.
   * @param {string} inputs[].prevTxHash Hash/id of the previous transactions.
   * @param {int} inputs[].prevTxIndex Index of the output in the previous tx.
   * @param {string} inputs[].privateKey Private key to sign this input, in WIF.
   * @param {int} inputs[].amount Amount of the UTXO.
   * @param {boolean} inputs[].isSegWit Indicates wether the UTXO is segwit
   * @param {Object[]} outputs Outputs of the transactions, in order.
   * @param {string} outputs[].address Address of the output.
   * @param {string} outputs[].amount Amount of the output.
   */
  createTx: (inputs, outputs) => {
    console.log('Start forging TX.');

    const txb = new bitcoin.TransactionBuilder(network);

    // Set the protocol version of the transaction
    txb.setVersion(1);

    // add the inputs
    console.log('Add the inputs.');
    inputs.forEach((input) => {
      // check required properties
      if (!Object.prototype.hasOwnProperty.call(input, 'prevTxHash')) {
        throw new Error('The Tx hash for the input was not found.');
      }
      if (!Object.prototype.hasOwnProperty.call(input, 'prevTxIndex')) {
        throw new Error('The previous Tx output index for the input was not found.');
      }
      if (!Object.prototype.hasOwnProperty.call(input, 'privateKey')) {
        throw new Error('The previous Tx output privateKey for the input was not found.');
      }

      txb.addInput(input.prevTxHash, input.prevTxIndex);
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
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const keyPair = bitcoin.ECPair.fromWIF(input.privateKey, network);

      let p2wpkh;
      let p2shSegwit;

      // sign depending on address input type
      switch (input.type) {
        case Constants.ADDRTYPE_P2SH_P2WPKH:
          // get the P2WPKH first
          p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });
          // now wrap it and get the P2SH-P2WPKH
          p2shSegwit = bitcoin.payments.p2sh({ redeem: p2wpkh, network });

          // vin, keyPair, redeemScript, hashType, witnessValue, witnessScript
          txb.sign(i, keyPair, p2shSegwit.redeem.output, null, input.amount);
          break;
        case Constants.ADDRTYPE_P2WPKH:
          // ge the P2WPKH
          p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });

          // vin, keyPair, redeemScript, hashType, witnessValue, witnessScript
          txb.sign(i, keyPair, p2wpkh.redeem.output, null, input.amount);
          break;
        default:
          // assume P2PKH

          // vin, keyPair
          txb.sign(i, keyPair);
          break;
      }
    }

    console.log('Build TX.');
    const txBuild = txb.build();
    return txBuild;
  },
};

export default TxService;
