class TxInput {
  constructor(initialAttrs) {
    // defaults
    this.index = 0;
    this.prevTxHash = '';
    this.prevTxIndex = 0;
    this.privateKey = '';
    this.amount = 0;
    this.type = 'P2PKH';

    Object.assign(this, initialAttrs);
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
