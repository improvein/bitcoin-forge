import * as Constants from '../model/Constants';
import { TxInput } from '../model';

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
   * Decodes a Transaction from it's hexadecimal format
   * @param {string} txHexa Hexadecimal notation of the transaction
   * @return {Object} Transaction object
   */
  decodeTx: (txHexa) => {
    const tx = bitcoin.Transaction.fromHex(txHexa);
    return tx;
  },

  /**
   * Creates a raw Transaction
   * @param {TxInput[]} inputs Inputs of the transaction, in order.
   * @param {TxOutput[]} outputs Outputs of the transactions, in order.
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

      // TX to be built
      let txBuilt;

      let p2sh;
      let scriptSig;
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
          console.log('Build TX.');
          txBuilt = txb.build();
          break;

        case Constants.ADDRTYPE_P2WPKH:
          // ge the P2WPKH
          p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });

          // vin, keyPair, redeemScript, hashType, witnessValue, witnessScript
          txb.sign(i, keyPair, p2wpkh.redeem.output, null, input.amount);
          console.log('Build TX.');
          txBuilt = txb.build();
          break;

        case Constants.ADDRTYPE_P2SH:
          // scriptSig = bitcoin.script.decompile(input.redeemScript);
          scriptSig = input.redeemScript;
          // // ge the P2SH
          // p2sh = bitcoin.payments.p2sh({ redeem: redeemScript, network });

          // vin, keyPair, redeemScript, hashType, witnessValue, witnessScript
          // txb.sign(i, keyPair, p2sh.redeem.output);
          console.log('Building TX.');
          txBuilt = txb.buildIncomplete();

          txBuilt.setInputScript(i, scriptSig);
          break;

        default:
          // assume P2PKH

          // vin, keyPair
          txb.sign(i, keyPair);
          console.log('Build TX.');
          txBuilt = txb.build();
          break;
      }
    }

    return txBuilt;
  },
};

export default TxService;
