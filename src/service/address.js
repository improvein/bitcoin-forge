const bitcoin = require('bitcoinjs-lib');

let network = bitcoin.networks.bitcoin;

const AddressService = {
  /**
   * Indicates if the services should operate with Testnet
   * @param {boolean} isTestnet
   */
  setTestnet: (isTestnet) => {
    network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
  },

  /**
   * Create a P2PKH address
   * @param {string|Buffer} publicKey Public key
   * @returns {string} Address in B58 format
   */
  createP2PKH: (publicKey) => {
    let pubkey = publicKey;
    if (!Buffer.isBuffer(pubkey)) {
      pubkey = Buffer.from(pubkey, 'hex');
    }

    const { address } = bitcoin.payments.p2pkh({ pubkey, network });
    return address;
  },

  /**
   * Create a P2WPKH address
   * @param {string|Buffer} publicKey Public key
   * @returns {string} Address in B58 format
   */
  createP2WPKH: (publicKey) => {
    let pubkey = publicKey;
    if (!Buffer.isBuffer(pubkey)) {
      pubkey = Buffer.from(pubkey, 'hex');
    }

    const { address } = bitcoin.payments.p2wpkh({ pubkey, network });
    return address;
  },

  /**
   * Create a P2PH-P2WPKH address
   * @param {string|Buffer} publicKey Public key
   * @returns {string} Address in B58 format
   */
  createP2PH_P2WPKH: (publicKey) => {
    let pubkey = publicKey;
    if (!Buffer.isBuffer(pubkey)) {
      pubkey = Buffer.from(pubkey, 'hex');
    }

    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey, network }),
      network,
    });
    return address;
  },

  /**
   * Create a P2SH, pay-to-multisig address
   * @param {string[]} publicKey Public keys
   * @param {int} requiredSigs Count of required signatures
   * @returns {string} Address in B58 format
   */
  createMultisigP2SH: (publicKeys, requiredSigs) => {
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, 'hex'));

    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({ m: requiredSigs, pubkeys, network }),
      network,
    });
    return address;
  },

  /**
   * Create a P2WSH (SegWit), pay-to-multisig address
   * @param {string[]} publicKey Public keys
   * @param {int} requiredSigs Count of required signatures
   * @returns {string} Address in B58 format
   */
  createMultisigP2WSH: (publicKeys, requiredSigs) => {
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, 'hex'));

    const { address } = bitcoin.payments.p2wsh({
      redeem: bitcoin.payments.p2ms({ m: requiredSigs, pubkeys, network }),
      network,
    });
    return address;
  },

  /**
   * Create a P2SH(P2WSH(...)), pay-to-multisig address
   * @param {string[]} publicKey Public keys
   * @param {int} requiredSigs Count of required signatures
   * @returns {string} Address in B58 format
   */
  createMultisigP2SH_P2WSH: (publicKeys, requiredSigs) => {
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, 'hex'));

    const { address } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wsh({
        redeem: bitcoin.payments.p2ms({ m: requiredSigs, pubkeys, network }),
        network,
      }),
    });
    return address;
  },

  createP2SH: (redeemScript) => {
    let scriptBuffer = redeemScript;
    // if string assume hex and convert to Buffer
    if (typeof redeemScript === 'string') {
      scriptBuffer = Buffer.from(redeemScript, 'hex');
    }

    const address = bitcoin.address.fromOutputScript(scriptBuffer, network);
    return address;
  },
};

export default AddressService;
