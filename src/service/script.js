import { OpCode } from '../model';

const bitcoin = require('bitcoinjs-lib');

const scriptService = {
  /**
   * Decompile a script in HEX and return a readable string with the ASM
   * @param {string} scriptHex Hexadecimal representation of a spending script
   * @returns {string} Decompiled ASM in text form
   */
  decompileScriptASM: (scriptHex) => {
    // validate if it's a proper hex
    if (!/[0-9a-fA-F]+/g.test(scriptHex)) {
      throw new Error('Invalid hexadecimal string.');
    }

    const scriptBuffer = Buffer.from(scriptHex, 'hex');
    return bitcoin.script.toASM(scriptBuffer);
  },

  /**
   * Compile a script
   * @param {array} stack Stack of commands to compile
   */
  compileScript: (stack) => {
    const compiledScript = bitcoin.script.compile(stack);
    return compiledScript;
  },

  /**
   * Get the opcodes available (object OpCod)
   * @returns {OpCode[]} Opcodes
   */
  getOpcodes: () => {
    const opCodeNames = Object.getOwnPropertyNames(bitcoin.opcodes);
    const opCodes = opCodeNames.map(
      opCodeName => new OpCode({
        name: opCodeName,
        code: bitcoin.opcodes[opCodeName],
      }),
    );

    return opCodes;
  },
};

export default scriptService;
