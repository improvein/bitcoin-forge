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

export default {
  hash,
};
