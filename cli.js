#!/usr/bin/env node

const program = require('commander');
const txService = require('./src/service/tx');
const scriptService = require('./src/service/script');

program.version('0.1.0').description('₿itcoin Forge is a tool for the Bitcoin protocol.');

program
  .command('tx <inputsQ> <outputsQ> [ios...]')
  .description('Forge a TX')
  .option('-t, --testnet', 'Indicates if "Testnet" should be used')
  .action((inputsQ, outputsQ, ios, options) => {
    // set the network to work with
    const isTestnet = options.testnet === true;
    txService.setTestnet(isTestnet);

    let iosReadCount = 0;
    const inputs = [];
    const outputs = [];

    // read inputs
    for (let i = 0; i < inputsQ; i += 1) {
      const inputTxhash = ios[iosReadCount];
      const inputOutputIndex = ios[iosReadCount + 1];
      const inputOutputPrivKey = ios[iosReadCount + 2];
      iosReadCount += 3; // move 3 positions at a time

      const input = {
        prevTxHash: inputTxhash,
        prevTxIndex: parseInt(inputOutputIndex, 10),
        privateKey: inputOutputPrivKey,
      };

      // check if there is an additional field for the input amount
      // (should be numeric only)
      if (/^\d+$/.test(ios[iosReadCount])) {
        input.amount = parseInt(ios[iosReadCount], 10);
        iosReadCount += 1; // move 1 position for this field
      }

      inputs.push(input);
    }

    // read outputs
    for (let o = 0; o < outputsQ; o += 1) {
      const outputAddress = ios[iosReadCount];
      const outputAmount = ios[iosReadCount + 1];
      iosReadCount += 2; // move 2 positions at a time

      outputs.push({
        address: outputAddress,
        amount: parseInt(outputAmount, 10),
      });
    }

    const tx = txService.createTx(inputs, outputs);

    // prepare for display
    const txDisplay = {
      id: tx.getId(),
      size: tx.byteLength(),
      virtualSize: tx.virtualSize(),
      weight: tx.weight(),
      inputsNum: tx.ins.length,
      outputsNum: tx.outs.length,
      hex: tx.toHex(),
    };
    console.log('TX:', txDisplay);
  });

program
  .command('decompileasm <scriptHex>')
  .description('Decompile a script into the ASM')
  .action((scriptHex) => {
    const asm = scriptService.decompileScriptASM(scriptHex);

    console.log('Script ASM: ', asm);
  });

program.parse(process.argv);
