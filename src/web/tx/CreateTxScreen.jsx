import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';

class CreateTxScreen extends Component {
  constructor() {
    super();
    this.state = {
      test: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { test } = this.state;
    return (
      <div>
        <h1>Transaction forge</h1>
        <form id="tx-form">
          <Input
            text="Test"
            label="test"
            type="text"
            id="test"
            value={test}
            handleChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
export default CreateTxScreen;
