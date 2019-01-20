const bitcoin = require('bitcoinjs-lib');

/**
 * Decompile a script in HEX and return a readable string with the ASM
 * @param {string} scriptHex Hexadecimal representation of a spending script
 * @returns {string} Decompiled ASM in text form
 */
exports.decompileScriptASM = (scriptHex) => {
  // validate if it's a proper hex
  if (!/[0-9a-fA-F]+/g.test(scriptHex)) {
    throw new Error('Invalid hexadecimal string.');
  }

  const scriptBuffer = Buffer.from(scriptHex, 'hex');
  return bitcoin.script.toASM(scriptBuffer);
};
