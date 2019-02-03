class TxInput {
  constructor(
    index = 0,
    prevTxHash = '',
    prevTxIndex = 0,
    privateKey = '',
    amount = 0,
    type = 'P2PKH',
  ) {
    this.index = index;
    this.prevTxHash = prevTxHash;
    this.prevTxIndex = prevTxIndex;
    this.privateKey = privateKey;
    this.amount = amount;
    this.type = type;
  }

  /**
   * Indicates if this Input is SegWit
   */
  isSegWit() {
    return (
      this.type === 'P2WPKH'
      || this.type === 'P2WSH'
      || this.type === 'P2SH-P2WPKH'
      || this.type === 'P2SH-P2WSH'
    );
  }
}

export default TxInput;
