class OpCode {
  constructor(initialAttrs) {
    // defaults
    this.name = '';
    this.code = 0;

    Object.assign(this, initialAttrs);
  }
}

export default OpCode;
