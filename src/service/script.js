import { OpCode } from '../model';

const bitcoin = require('bitcoinjs-lib');

/**
 * Decompile a script in HEX and return a readable string with the ASM
 * @param {string} scriptHex Hexadecimal representation of a spending script
 * @returns {string} Decompiled ASM in text form
 */
const decompileScriptASM = (scriptHex) => {
  // validate if it's a proper hex
  if (!/[0-9a-fA-F]+/g.test(scriptHex)) {
    throw new Error('Invalid hexadecimal string.');
  }

  const scriptBuffer = Buffer.from(scriptHex, 'hex');
  return bitcoin.script.toASM(scriptBuffer);
};

/**
 * Compile a script
 * @param {array} stack Stack of commands to compile
 */
const compileScript = (stack) => {
  const parsedStack = stack.map((stackValue) => {
    if (typeof stackValue === 'string') {
      // asume hexadecimal
      return Buffer.from(stackValue, 'hex');
    }
    // assume numeric, return raw value
    return stackValue;
  });
  const compiledScript = bitcoin.script.compile(parsedStack);
  return compiledScript;
};

/**
 * Compile the script from a ASM string in readable form
 * @param {string} asmString String of the ASM in human readable form
 */
const compileScriptFromString = (asmString) => {
  let parsedAsmString = asmString;
  // remove <> charaters and spaces
  parsedAsmString = parsedAsmString.replace(/[<>\s]/g, ' ');
  // fix standalone numbers and make them hexa
  parsedAsmString = parsedAsmString.replace(
    /(\s|^)\d+(\s|$)/g,
    match => ` ${bitcoin.script.number.encode(parseInt(match, 10)).toString('hex')} `,
  );
  // remove extra spaces
  parsedAsmString = parsedAsmString.replace(/\s+/g, ' ');
  parsedAsmString = parsedAsmString.trim();

  const compiledScript = bitcoin.script.fromASM(parsedAsmString);
  return compiledScript;
};

/**
 * Get the opcodes available (object OpCod)
 * @returns {OpCode[]} Opcodes
 */
const getOpcodes = () => {
  const opCodeNames = Object.getOwnPropertyNames(bitcoin.opcodes);
  const opCodes = opCodeNames.map(
    opCodeName => new OpCode({
      name: opCodeName,
      code: bitcoin.opcodes[opCodeName],
    }),
  );

  return opCodes;
};

export default {
  decompileScriptASM,
  compileScript,
  compileScriptFromString,
  getOpcodes,
};
