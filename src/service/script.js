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
 * @param {object} replacements Token replacements for the string
 */
const compileScriptFromString = (asmString, replacements = {}) => {
  let parsedAsmString = asmString;

  // find tokens for replacements <> and replace for the corresponding value
  parsedAsmString = parsedAsmString.replace(/<(\S+)>/g, (match, p1) => {
    let replaceToken = p1;

    // check what kind of token we have

    if (replaceToken.startsWith('HASH160')) {
      replaceToken = replaceToken.substring(
        replaceToken.indexOf('(') + 1,
        replaceToken.indexOf(')'),
      );
      let replaceValue = replacements[replaceToken];
      if (replaceValue) {
        replaceValue = bitcoin.crypto.hash160(Buffer.from(replaceValue, 'hex')).toString('hex');
      }
      return replaceValue;
    }

    if (replaceToken.startsWith('HASH256')) {
      replaceToken = replaceToken.substring(
        replaceToken.indexOf('(') + 1,
        replaceToken.indexOf(')'),
      );
      let replaceValue = replacements[replaceToken];
      if (replaceValue) {
        replaceValue = bitcoin.crypto.hash256(Buffer.from(replaceValue, 'hex')).toString('hex');
      }
      return replaceValue;
    }

    const replaceValue = replacements[p1];
    if (replaceValue) {
      return replaceValue;
    }

    return match;
  });
  // const replacementKeys = Object.keys(replacements);
  // for (let r = 0; r < replacementKeys.length; r += 1) {
  //   const replacementKey = replacementKeys[r];
  //   parsedAsmString = parsedAsmString.replace(replacementKey, replacements[replacementKey]);
  // }
  // // remove unnecessary <> symbols
  // parsedAsmString = parsedAsmString.replace(/[<>\s]/g, ' ');

  // fix standalone numbers and make them hexa
  parsedAsmString = parsedAsmString.replace(
    /(\s|^)\d+(\s|$)/g,
    match => ` ${bitcoin.script.number.encode(parseInt(match, 10)).toString('hex')} `,
  );
  // remove extra spaces
  parsedAsmString = parsedAsmString.replace(/\s+/g, ' ');
  parsedAsmString = parsedAsmString.trim();

  const compiledScript = bitcoin.script.fromASM(parsedAsmString);
  return {
    script: compiledScript,
    parsedAsm: parsedAsmString,
  };
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
