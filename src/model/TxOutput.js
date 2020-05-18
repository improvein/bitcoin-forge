class TxOutput {
  constructor(type = 'STANDARD', index = 0, address = '', amount = 0, data = undefined) {
    this.type = type;
    this.index = index;
    this.address = address;
    this.amount = amount;
    this.data = data;
  }
}

export default TxOutput;
