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
      parsedAsm: '',
      compiledScript: '',
      replacements: [],
      newReplacementName: '',
      newReplacementValue: '',
      replacementsErrorMessage: '',
      errorMessage: '',
    };

    this.onCompileClick = this.onCompileClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddReplacementClick = this.onAddReplacementClick.bind(this);
    this.onRemoveReplacementClick = this.onRemoveReplacementClick.bind(this);
    this.compilePolicy = this.compilePolicy.bind(this);
  }

  onCompileClick() {
    const { policy, replacements } = this.state;
    this.compilePolicy(policy, replacements);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onAddReplacementClick() {
    const { replacements, newReplacementName, newReplacementValue } = this.state;

    if (!newReplacementName || !newReplacementValue) {
      this.setState({
        replacementsErrorMessage: 'You need enter a name and a value for the key',
      });
      return;
    }

    if (replacements.some(replacement => replacement.name === newReplacementName)) {
      this.setState({
        replacementsErrorMessage: 'There is already a key with that name',
      });
      return;
    }

    const newReplacements = replacements;
    newReplacements.push({ name: newReplacementName, value: newReplacementValue });

    this.setState({
      replacements: newReplacements,
      newReplacementName: '',
      newReplacementValue: '',
      replacementsErrorMessage: '',
    });
  }

  onRemoveReplacementClick(replacementName) {
    const { replacements } = this.state;
    const newReplacements = replacements.filter(
      replacement => replacement.name !== replacementName,
    );
    this.setState({ replacements: newReplacements });
  }

  compilePolicy(src, replacements) {
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

      try {
        // convert the array of replacements to the object
        const tokenReplacements = {};
        for (let r = 0; r < replacements.length; r += 1) {
          tokenReplacements[replacements[r].name] = replacements[r].value;
        }
        const compiledResult = ScriptService.compileScriptFromString(
          newState.opcodeScript,
          tokenReplacements,
        );
        newState.parsedAsm = compiledResult.parsedAsm;
        newState.compiledScript = compiledResult.script.toString('hex');

        newState.errorMessage = '';
      } catch (compileError) {
        newState.errorMessage = `Cannot compile final script. ${compileError.message}`;
      }

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
      parsedAsm,
      compiledScript,
      replacements,
      newReplacementName,
      newReplacementValue,
      replacementsErrorMessage,
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
            <p className="small">
              In the table below, enter the keys names used in the above policy, with the
              corresponding value.
            </p>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <td>&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                {replacements.map(replacement => (
                  <tr key={replacement.name}>
                    <td>
                      <code>{replacement.name}</code>
                    </td>
                    <td>
                      <code className="text-break">{replacement.value}</code>
                    </td>
                    <td>
                      <Button
                        btnClass="danger"
                        size="sm"
                        onClick={() => this.onRemoveReplacementClick(replacement.name)}
                      >
                        <FontAwesomeIcon icon="minus-circle" className="mr-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <input
                      type="text"
                      id="newReplacementName"
                      name="replacement-name"
                      className="form-control form-control-sm"
                      onChange={this.onInputChange}
                      value={newReplacementName}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="newReplacementValue"
                      name="replacement-value"
                      className="form-control form-control-sm"
                      onChange={this.onInputChange}
                      value={newReplacementValue}
                    />
                  </td>
                  <td>
                    <Button
                      btnClass="primary"
                      size="sm"
                      onClick={this.onAddReplacementClick}
                      title="Add new key"
                    >
                      <FontAwesomeIcon icon="plus-circle" className="mr-1" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-warning">{replacementsErrorMessage}</p>

            <Button btnClass="primary" onClick={this.onCompileClick}>
              <FontAwesomeIcon icon="cogs" className="mr-2" />
              Compile
            </Button>
            <hr />
            <div>
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
                <p className="text-console form-control-plaintext">
                  <code>{parsedAsm}</code>
                </p>
              </div>
              <div className="form-group">
                <label>Result raw script (hex)</label>
                <p className=" form-control-plaintext">
                  <code>{compiledScript}</code>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="card">
              <div className="card-header">
                <h3>Help</h3>
              </div>
              <div className="card-body">
                <div className="card-text small">
                  <p>
                    For now, Miniscript is really only designed for P2WSH and P2SH-P2WSH embedded
                    scripts
                  </p>
                  <p>Supported policies:</p>
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
