class StackItem {
  constructor(initialAttrs) {
    // defaults
    this.name = '';
    this.value = 0;

    Object.assign(this, initialAttrs);
  }

  isOpcode() {
    return this.name.startsWith('OP_') && typeof this.value === 'number';
  }
}

export default StackItem;
