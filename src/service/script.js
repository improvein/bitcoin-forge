const bitcoin = require('bitcoinjs-lib');

/**
 * Decompile a script in HEX and return a readable string with the ASM
 * @param {string} scriptHex Hexadecimal representation of a spending script
 */
exports.decompileScriptASM = (scriptHex) => {
  const scriptBuffer = Buffer.from(scriptHex, 'hex');
  return bitcoin.script.toASM(scriptBuffer);
};
