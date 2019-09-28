import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ScriptService from '../../service/script';
import { Button, InputField } from '../components';

class CreateMiniscriptScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      policy: '',
      miniscript: '',
      result: '',
      errorMessage: '',
    };

    this.onCompileClick = this.onCompileClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.compilePolicy = this.compilePolicy.bind(this);
    this.htmlEscape = this.htmlEscape.bind(this);
  }

  onCompileClick() {
    const { policy } = this.state;
    this.compilePolicy(policy);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  compilePolicy(src) {
    const msout = Module._malloc(10000);
    const costout = Module._malloc(500);
    const asmout = Module._malloc(100000);
    em_miniscript_compile(src, msout, 10000, costout, 500, asmout, 100000);

    this.setState(
      {
        miniscript: Module.UTF8ToString(msout),
        result:
          `<p><p><b>Miniscript output:</b><p><code>${this.htmlEscape(
            Module.UTF8ToString(msout),
          )}</code>`
          + `<p><b>Spending cost analysis</b><p>${Module.UTF8ToString(costout)}`
          + `<p><b>Resulting script structure</b><p><samp><pre>${this.htmlEscape(
            Module.UTF8ToString(asmout),
          )}</pre></samp>`,
      },
      () => {
        Module._free(msout);
        Module._free(costout);
        Module._free(asmout);
      },
    );
  }

  // miniscript_analyze() {
  //   document.getElementById('analyze_out').innerHTML = 'Analyzing...';
  //   setTimeout(() => {
  //     src = document.getElementById('analyze_ms').value;
  //     const analyze_out = Module._malloc(50000);
  //     const asmout = Module._malloc(100000);
  //     em_miniscript_analyze(src, analyze_out, 50000, asmout, 100000);
  //     document.getElementById('analyze_out').innerHTML = `<p><p><b>Analysis</b><p>${Module.UTF8ToString(
  //       analyze_out,
  //     )}<p><small>Hover over the tree elements for more details</small>`
  //       + `<p><b>Resulting script structure</b><p><samp><pre>${htmlEscape(
  //         Module.UTF8ToString(asmout),
  //       )}</pre></samp>`;
  //     Module._free(analyze_out);
  //     Module._free(asmout);
  //   });
  // }

  render() {
    const {
      policy, miniscript, result, errorMessage,
    } = this.state;

    return (
      <div>
        <h1>Create a script using Miniscript</h1>
        <p>
          Forge a script using Miniscript.
          <br />
          To learn more please go to
          {' '}
          <a href="http://bitcoin.sipa.be/miniscript/">http://bitcoin.sipa.be/miniscript/</a>
        </p>
        <div className="row">
          <div className="col-12 col-sm-5">
            <InputField
              label="Policy"
              id="policy"
              type="text"
              value={policy}
              onChange={this.onInputChange}
            />
            <Button btnClass="primary" onClick={this.onCompileClick}>
              <FontAwesomeIcon icon="cogs" className="mr-2" />
              Compile
            </Button>

            <p className="text-danger">{errorMessage}</p>
            <p>{miniscript}</p>
            <p>{result}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateMiniscriptScreen;
