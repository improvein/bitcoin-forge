import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HexInputField, Button, InputField } from '../components';

class NodeMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: '',
      errorMessage: '',
      result: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onRun = this.onRun.bind(this);
  }

  onInputChange(event) {
    const fieldValue = event.target.value;

    // update state property
    this.setState({ [event.target.id]: fieldValue });
  }

  onRun(event) {
    const { method } = this.state;
    const { nodeService } = this.props;

    try {
      const result = nodeService.rpcSend(method);

      this.setState({ errorMessage: '', result: JSON.stringify(result) });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  render() {
    const { method, result, errorMessage } = this.state;

    return (
      <div className="">
        <InputField label="Method" id="method" type="text" value={method} onChange={this.onInputChange} />

        <Button btnClass="primary" onClick={this.onRun}>
          <FontAwesomeIcon icon="play" className="mr-1" /> Run command
        </Button>
        <hr />
        <p className="text-danger">{errorMessage}</p>
        <div className="form-group">
          <label>Result</label>
          <p className="text-console form-control-plaintext">{result}</p>
        </div>
      </div>
    );
  }
}

NodeMethod.propTypes = {
  nodeService: PropTypes.object.isRequired,
  onCreate: PropTypes.func,
};
NodeMethod.defaultProps = {
  onCreate: () => {},
};

export default NodeMethod;
