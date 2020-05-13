const bitcoin = require('bitcoinjs-lib');

/**
 *
 * @param {string[]} algos Has to be one of the accepted algorithms (sha256, sha1, )
 * @param {string|Buffer} content
 */
const hash = (algos, content) => {
  let contentToHash = content;
  if (!Buffer.isBuffer(content)) {
    contentToHash = Buffer.from(content, 'utf8');
  }

  let hashResultMap = {};

  for (let a = 0; a < algos.length; a++) {
    const algo = algos[a];
    switch (algo) {
      case 'sha1':
        hashResultMap.sha1 = bitcoin.crypto.sha1(contentToHash).toString('hex');
        break;
      case 'sha256':
        hashResultMap.sha256 = bitcoin.crypto.sha256(contentToHash).toString('hex');
        break;
      case 'ripemd160':
        hashResultMap.ripemd160 = bitcoin.crypto.ripemd160(contentToHash).toString('hex');
        break;
      case 'hash160':
        hashResultMap.hash160 = bitcoin.crypto.hash160(contentToHash).toString('hex');
        break;
      default:
        const notSupportedError = new Error('Hash algorithm not supported');
        throw notSupportedError;
    }
  }

  return hashResultMap;
};

/**
 * Generates a Elliptic Curve key pair (ECPair)
 * @param {string|Buffer} privateKey Private key (optional)
 * @returns {bitcoin.ECPair}
 */
const generateECPair = (privateKey) => {
  let ecPair = null;
  if (privateKey) {
    let privateKeyBuffer = privateKey;
    if (!Buffer.isBuffer(privateKey)) {
      privateKeyBuffer = Buffer.from(privateKey, 'hex');
    }
    ecPair = bitcoin.ECPair.fromPrivateKey(privateKeyBuffer);
  } else {
    ecPair = bitcoin.ECPair.makeRandom();
  }

  return ecPair;
};

/**
 * Sign a content
 * @param {Buffer} content Content to sign
 * @param {string} hashAlgo Hashing algorithm (sha256, sha1, )
 * @param {bitcoin.ECPair} ecPair
 */
const signContent = (content, hashAlgo, ecPair) => {
  let contentHashedBuffer = Buffer.alloc(32);
  switch (hashAlgo) {
    case 'sha1':
      contentHashedBuffer = bitcoin.crypto.sha1(content);
      break;
    case 'ripemd160':
      contentHashedBuffer = bitcoin.crypto.ripemd160(content);
      break;
    case 'hash160':
      contentHashedBuffer = bitcoin.crypto.hash160(content);
      break;
    case 'sha256':
    default:
      contentHashedBuffer = bitcoin.crypto.sha256(content);
  }

  const signature = ecPair.sign(contentHashedBuffer);
  return signature;
};

export default {
  hash,
  generateECPair,
  signContent,
};
