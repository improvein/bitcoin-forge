class TxInput {
  constructor(index = 0, prevTxHash = '', prevTxIndex = '', privateKey = '', amount = 0) {
    this.index = index;
    this.prevTxHash = prevTxHash;
    this.prevTxIndex = prevTxIndex;
    this.privateKey = privateKey;
    this.amount = amount;
  }
}

export default TxInput;
