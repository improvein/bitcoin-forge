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
      // depending on the type of outputs, it's different
      if (output.type === Constants.TXOUTPUT_OPRETURN) {
        const data = Buffer.from(output.data, 'hex');
        const embed = bitcoin.payments.embed({ data: [data] });
        txb.addOutput(embed.output, 0);
      } else {
        // check required properties
        if (!Object.prototype.hasOwnProperty.call(output, 'address')) {
          throw new Error('The address for the output was not found.');
        }
        if (!Object.prototype.hasOwnProperty.call(output, 'amount')) {
          throw new Error('The amount for the output was not found.');
        }

        txb.addOutput(output.address, output.amount);
      }
    });

    // Now that the base transaction structure is created
    // we can sign the proper inputs since we needed the hash of a simplified tx to do it

    // now sign the inputs that need to be signed
    console.log('Sign the inputs.');
    inputs.forEach((input, i) => {
      // only for INPUTS that require signing
      if (![Constants.ADDRTYPE_P2PKH, Constants.ADDRTYPE_P2WPKH, Constants.ADDRTYPE_P2SH_P2WPKH].includes(input.type)) {
        return;
      }

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

        case Constants.ADDRTYPE_P2PKH:
          // vin, keyPair
          txb.sign(i, keyPair);
          break;
        default:
        // DO NOTHING
      }
    });

    // Now that everything that needs to be signed it is
    // build the TX in order to assign the redeem scripts

    // TX built to add redeem
    const txBuilt = txb.buildIncomplete();

    // now set the redeem scripts
    console.log('Set redeem scripts for inputs.');
    inputs.forEach((input, i) => {
      // only for INPUTS that require redeem script
      if (![Constants.ADDRTYPE_P2SH, Constants.ADDRTYPE_P2WSH].includes(input.type)) {
        return;
      }

      let scriptSig;

      switch (input.type) {
        case Constants.ADDRTYPE_P2SH:
          scriptSig = input.redeemScript;
          txBuilt.setInputScript(i, Buffer.from(scriptSig, 'hex'));
          break;

        default:
        // DO NOTHING
      }
    });

    return txBuilt;
  },
};

export default TxService;
