import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ScriptService from '../../service/script';
import AddressService from '../../service/address';
import { HexInput, Button, SelectNetworkField } from '../components';
import StackItem from './StackItem';

class CreateScriptScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTestnet: true,
      stack: [],
      customValue: '',
      opCodes: ScriptService.getOpcodes(),
      filteredOpCodes: ScriptService.getOpcodes(),
      script: '',
      address: '',
      errorMessage: '',
      addressErrorMessage: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCustomValueAdd = this.onCustomValueAdd.bind(this);
    this.onOpCodeFilterChange = this.onOpCodeFilterChange.bind(this);
    this.onOpcodeAdd = this.onOpcodeAdd.bind(this);
    this.onItemDragStart = this.onItemDragStart.bind(this);
    this.onItemDragOver = this.onItemDragOver.bind(this);
    this.onItemDragEnd = this.onItemDragEnd.bind(this);
    this.onStackClear = this.onStackClear.bind(this);
    this.onNetworkChange = this.onNetworkChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    // Init
    AddressService.setTestnet(true);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onItemDragStart(event, index) {
    const { stack } = this.state;

    this.draggedStackItem = stack[index];
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.currentTarget);
  }

  onItemDragOver(index) {
    const { stack } = this.state;

    const draggedOverStackItem = stack[index];

    // if the item is dragged over itself, ignore
    if (this.draggedStackItem === draggedOverStackItem) {
      return;
    }

    // filter out the currently dragged item
    const newStack = stack.filter(item => item !== this.draggedStackItem);

    // add the dragged item after the dragged over item
    newStack.splice(index, 0, this.draggedStackItem);

    this.setState({ stack: newStack });
  }

  onItemDragEnd(event) {
    this.draggedStackItem = null;
  }

  onCustomValueAdd(event) {
    const { stack, customValue } = this.state;

    // only add if there is a value
    if (customValue.length > 0) {
      const stackItem = new StackItem({
        name: customValue,
        value: customValue,
      });
      stack.push(stackItem);
      this.setState({
        stack,
      });
    }
  }

  onOpCodeFilterChange(event) {
    const { opCodes } = this.state;

    const { value } = event.target;

    let filteredOpCodes = opCodes;
    if (value.length > 0) {
      filteredOpCodes = opCodes.filter(opcode => opcode.name.toLowerCase().includes(value.toLowerCase()));
    }
    this.setState({ filteredOpCodes });
  }

  onOpcodeAdd(event, opCode) {
    const { stack } = this.state;

    const stackItem = new StackItem({
      name: opCode.name,
      value: opCode.code,
    });
    stack.push(stackItem);
    this.setState({
      stack,
    });
  }

  onStackClear(event) {
    this.setState({
      stack: [],
    });
  }

  onNetworkChange(isTestnet) {
    AddressService.setTestnet(isTestnet);
    this.setState({ isTestnet });
  }

  buttonClick(event) {
    const { stack } = this.state;

    // check if the stack is empty
    if (stack.length === 0) {
      this.setState({
        errorMessage: 'The stack is empty',
      });
      return;
    }

    try {
      // obtain the raw values for the stack
      const stackRaw = stack.map(stackItem => stackItem.value);
      // decompile
      const script = ScriptService.compileScript(stackRaw);

      // generate address
      let address = '';
      try {
        address = AddressService.createP2SH(script);
        this.setState({
          addressErrorMessage: '',
        });
      } catch (addErr) {
        console.error(addErr);
        this.setState({
          addressErrorMessage: addErr.message,
        });
      }

      // set the state with the final results
      this.setState({
        script: script.toString('hex'),
        address,
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
    const {
      isTestnet,
      stack,
      filteredOpCodes,
      script,
      address,
      errorMessage,
      addressErrorMessage,
    } = this.state;

    return (
      <div>
        <h1>Create a script</h1>
        <p>Forge a script by adding items to the stack, and then compile it.</p>
        <div className="row">
          <div className="col-12 col-sm-5">
            <div className="card border-primary">
              <div className="card-header">
                <button
                  type="button"
                  className="btn btn-link btn-sm float-right"
                  title="Clear stack"
                  onClick={this.onStackClear}
                >
                  <FontAwesomeIcon icon="trash" />
                </button>
                <h3>Stack</h3>
              </div>
              <div className="card-body">
                <ul className="list-dnd">
                  {stack.map((item, index) => (
                    <li
                      key={index}
                      draggable
                      className="list-dnd-item"
                      onDragStart={e => this.onItemDragStart(e, index)}
                      onDragOver={() => this.onItemDragOver(index)}
                      onDragEnd={this.onItemDragEnd}
                    >
                      <span
                        className={`badge badge-${
                          item.isOpcode() ? 'secondary' : 'info'
                        } my-1 list-dnd-item`}
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-2">
              <SelectNetworkField
                id="p2sh-network"
                isTestnet={isTestnet}
                onChange={this.onNetworkChange}
              />
            </div>
            <p className="text-danger">{errorMessage}</p>
          </div>
          <div className="col-12 col-sm-7">
            <div className="form-group">
              <label htmlFor="custom-value">Custom value</label>
              <div className="d-flex">
                <button
                  className="btn btn-link"
                  type="button"
                  title="Add value to stack"
                  onClick={this.onCustomValueAdd}
                >
                  <FontAwesomeIcon icon="plus-circle" />
                </button>
                <div className="flex-grow-1">
                  <HexInput id="customValue" onChange={this.onInputChange} />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col col-sm-6">Available OPCODES</div>
                  <div className="col col-sm-6">
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      id="opcodeFilter"
                      onChange={this.onOpCodeFilterChange}
                      placeholder="Filter OPCODEs"
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-unstyled row">
                  {filteredOpCodes.map(item => (
                    <li key={item.name} className="col text-nowrap opcode-item">
                      <span className="badge badge-secondary my-1">{item.name}</span>
                      <button
                        type="button"
                        className="btn btn-link"
                        title="Add OPCODE to stack"
                        onClick={event => this.onOpcodeAdd(event, item)}
                      >
                        <FontAwesomeIcon icon="plus-circle" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Button text="Compile" btnClass="primary" onClick={this.buttonClick} />
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Result</h5>
            <p className="card-text" id="asm-result">
              <strong>Raw script (hex): </strong>
              {script}
            </p>
            <p className="card-text" id="address-result">
              <strong>P2SH Address: </strong>
              {address}
              <span className="text-danger">{addressErrorMessage}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateScriptScreen;
