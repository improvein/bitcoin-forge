class TxInput {
  constructor(index = 0, prevTxHash = '', prevTxIndex = 0, privateKey = '', amount = 0, isSegWit = true) {
    this.index = index;
    this.prevTxHash = prevTxHash;
    this.prevTxIndex = prevTxIndex;
    this.privateKey = privateKey;
    this.amount = amount;
    this.isSegWit = isSegWit;
  }
}

export default TxInput;
