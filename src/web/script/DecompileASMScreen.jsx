import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class DecompileASMScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hexScript: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange(event) {
    this.setState({ hexScript: event.target.value });
  }

  buttonClick(event) {
    const { hexScript } = this.state;
    console.log(`Decompiling: ${hexScript}`);
  }

  render() {
    const { hexScript } = this.state;

    return (
      <div>
        <h1>Decompile ASM from hexa</h1>
        <form id="script-decompile-asm-form">
          <Input
            text="Hexadecimal script"
            label="seo_title"
            type="text"
            id="hex-script"
            value={hexScript}
            handleChange={this.handleChange}
          />
          <Button text="Submit" btnClass="primary" onClick={this.buttonClick} />
        </form>
      </div>
    );
  }
}
export default DecompileASMScreen;
