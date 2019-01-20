import React, { Component } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ScriptService from '../../service/script';

class DecompileASMScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hexScript: '',
      asmResult: '',
      errorMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange(event) {
    this.setState({ hexScript: event.target.value });
  }

  buttonClick(event) {
    const { hexScript } = this.state;
    // decompile
    try {
      const asm = ScriptService.decompileScriptASM(hexScript);
      this.setState({
        asmResult: asm,
        errorMessage: '',
      });
    } catch (err) {
      console.error(err);
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  render() {
    const { hexScript, asmResult, errorMessage } = this.state;

    return (
      <div>
        <h1>Decompile ASM</h1>
        <p>Decompile the hexadecimal version of the script into human readable ASM.</p>
        <form id="script-decompile-asm-form">
          <InputField
            label="Hexadecimal script"
            type="text"
            id="hex-script"
            value={hexScript}
            handleChange={this.handleChange}
          />
          <p className="text-danger">{errorMessage}</p>
          <Button text="Submit" btnClass="primary" onClick={this.buttonClick} />
        </form>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Result (ASM)</h5>
            <p className="card-text" id="asm-result">
              {asmResult}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default DecompileASMScreen;
