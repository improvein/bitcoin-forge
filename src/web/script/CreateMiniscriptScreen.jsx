/* global Module, em_miniscript_compile */
/* eslint no-underscore-dangle: ["error", { "allow": ["_malloc", "_free"] }] */
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
      opcodeScript: '',
      spendingCost: '',
      errorMessage: '',
    };

    this.onCompileClick = this.onCompileClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.compilePolicy = this.compilePolicy.bind(this);
  }

  onCompileClick() {
    const { policy } = this.state;
    this.compilePolicy(policy);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  compilePolicy(src) {
    try {
      const msout = Module._malloc(10000);
      const costout = Module._malloc(500);
      const asmout = Module._malloc(100000);
      em_miniscript_compile(src, msout, 10000, costout, 500, asmout, 100000);

      const newState = {
        miniscript: Module.UTF8ToString(msout),
        opcodeScript: Module.UTF8ToString(asmout),
        spendingCost: Module.UTF8ToString(costout),
      };

      const compiledScript = ScriptService.compileScriptFromString(newState.opcodeScript);
      newState.compiledScript = compiledScript.toString('hex');

      this.setState(newState, () => {
        Module._free(msout);
        Module._free(costout);
        Module._free(asmout);
      });
    } catch (error) {
      console.error('Compiling miniscript', error);
      this.setState({
        errorMessage: error.message,
      });
    }
  }

  render() {
    const {
      policy,
      miniscript,
      opcodeScript,
      spendingCost,
      compiledScript,
      errorMessage,
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
          <div className="col-12 col-md-7">
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
            <hr />
            <p className="text-danger">{errorMessage}</p>
            <div className="form-group">
              <label>Miniscript</label>
              <p className="form-control-plaintext">
                <code className="">{miniscript}</code>
              </p>
            </div>
            <div className="form-group">
              <label>Spending cost</label>
              <div dangerouslySetInnerHTML={{ __html: spendingCost }} />
            </div>
            <div className="form-group">
              <label>Opcode script</label>
              <p className="text-console form-control-plaintext">{opcodeScript}</p>
            </div>
            <div className="form-group">
              <label>Result raw script (hex)</label>
              <code>{compiledScript}</code>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="card">
              <div className="card-header">
                <h3>Help</h3>
              </div>
              <div className="card-body">
                <div className="card-text small">
                  Supported policies:
                  <ul>
                    <li>
                      <samp>
                        pk(
                        <em>NAME</em>
)
                      </samp>
                      : Require public key named
                      {' '}
                      <em>NAME</em>
                      {' '}
to sign.
                      {' '}
                      <em>NAME</em>
                      {' '}
can be any
                      string up to 16 characters.
                    </li>
                    <li>
                      <samp>
                        after(
                        <em>NUM</em>
)
                      </samp>
                      ,
                      {' '}
                      <samp>
                        older(
                        <em>NUM</em>
)
                      </samp>
                      : Require that the
                      {' '}
                      <samp>nLockTime</samp>
/
                      <samp>nSequence</samp>
                      {' '}
value is at
                      least
                      {' '}
                      <em>NUM</em>
.
                      {' '}
                      <em>NUM</em>
                      {' '}
cannot be 0.
                    </li>
                    <li>
                      <samp>
                        sha256(
                        <em>HEX</em>
)
                      </samp>
                      ,
                      {' '}
                      <samp>
                        hash256(
                        <em>HEX</em>
)
                      </samp>
                      : Require that the preimage of 64-character
                      {' '}
                      <em>HEX</em>
                      {' '}
is revealed. The
                      special value
                      {' '}
                      <samp>H</samp>
                      {' '}
can be used as
                      {' '}
                      <em>HEX</em>
.
                    </li>
                    <li>
                      <samp>
                        ripemd160(
                        <em>HEX</em>
)
                      </samp>
                      ,
                      {' '}
                      <samp>
                        hash160(
                        <em>HEX</em>
)
                      </samp>
                      : Require that the preimage of 40-character
                      {' '}
                      <em>HEX</em>
                      {' '}
is revealed. The
                      special value
                      {' '}
                      <samp>H</samp>
                      {' '}
can be used as
                      {' '}
                      <em>HEX</em>
.
                    </li>
                    <li>
                      <samp>
                        and(
                        <em>POL</em>
,
                        <em>POL</em>
)
                      </samp>
                      : Require that both subpolicies are satisfied.
                    </li>
                    <li>
                      <samp>
                        or([
                        <em>N</em>
                        @]
                        <em>POL</em>
                        ,[
                        <em>N</em>
                        @]
                        <em>POL</em>
)
                      </samp>
                      : Require that one of the subpolicies is satisfied. The numbers N indicate the
                      relative probability of each of the subexpressions (so
                      {' '}
                      <samp>9@</samp>
                      {' '}
is 9
                      times more likely than the default).
                    </li>
                    <li>
                      <samp>
                        thresh(
                        <em>NUM</em>
,
                        <em>POL</em>
,
                        <em>POL</em>
                        ,...)
                      </samp>
                      : Require that NUM out of the following subpolicies are met (all combinations
                      are assumed to be equally likely).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateMiniscriptScreen;
