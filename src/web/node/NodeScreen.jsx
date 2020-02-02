import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NodeService from '../../service/node';
import { Button, InputField } from '../components';
import NodeMethod from './NodeMethod';

class NodeScreen extends Component {
  constructor() {
    super();
    this.state = {
      nodeHost: '',
      nodePort: '',
      nodeUser: '',
      nodePass: '',
      isNodeConnected: false,
      nodeConnectionError: '',
    };

    this.nodeService = null;
    this.onInputChange = this.onInputChange.bind(this);
    this.onNodeConnect = this.onNodeConnect.bind(this);
  }

  onInputChange(event) {
    const fieldValue = event.target.value;

    // update state property
    this.setState({ [event.target.id]: fieldValue });
  }

  onNodeConnect() {
    const { nodeHost, nodePort, nodeUser, nodePass } = this.state;

    if (!nodeHost || !nodePort || !nodeUser || !nodePass) {
      this.setState({
        nodeConnectionError: 'You need to fill out the connection parameters',
      });
    } else {
      this.nodeService = new NodeService(nodeHost, nodePort, nodeUser, nodePass);
      const isNodeConnected = this.nodeService.connect();

      this.setState({
        isNodeConnected,
        nodeConnectionError: '',
      });
    }
  }

  render() {
    const { nodeHost, nodePort, nodeUser, nodePass, isNodeConnected, nodeConnectionError } = this.state;

    return (
      <div>
        <h1>Operate with your node</h1>
        <p>
          Connect with your own custom Bitcoin Node using RPC commands. You can query information or send information through it.
          <br />
          You can check the{' '}
          <a href="https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list" target="_blank">
            list of available RPC commands in Bitcoin Core
          </a>
          .
        </p>

        <div className="card mb-3">
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                <button
                  className="btn btn-link btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#node-connection-body"
                  aria-expanded="false"
                  aria-controls="node-connection-body">
                  <FontAwesomeIcon icon="plus" className="mr-1" />
                </button>
                Node connection
              </div>
              <div className="col-md-6 text-right">
                {isNodeConnected ? (
                  <div>
                    <span className="text-success">Connected</span>
                    <Button btnClass="primary" size="sm" className="ml-2" onClick={this.onNodeConnect}>
                      Re-connect
                    </Button>
                  </div>
                ) : (
                  <div>
                    <span className="text-danger">Not connected</span>
                    <Button btnClass="primary" size="sm" className="ml-2" onClick={this.onNodeConnect}>
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-body collapse show" id="node-connection-body">
            {nodeConnectionError && <p className="text-danger">{nodeConnectionError}</p>}
            <div className="row">
              <div className="col-md-6">
                <InputField label="Host" id="nodeHost" type="text" value={nodeHost} onChange={this.onInputChange} size="sm" />
              </div>
              <div className="col-md-6">
                <InputField label="Port" id="nodePort" type="text" value={nodePort} onChange={this.onInputChange} size="sm" />
              </div>
              <div className="col-md-6">
                <InputField label="User" id="nodeUser" type="text" value={nodeUser} onChange={this.onInputChange} size="sm" />
              </div>
              <div className="col-md-6">
                <InputField label="Password" id="nodePass" type="text" value={nodePass} onChange={this.onInputChange} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {!isNodeConnected && (
          <div className="alert alert-warning" role="alert">
            You need to connect to the node first, in order to be able to operate with it.
          </div>
        )}
        {isNodeConnected && (
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="addr-types-tab" role="tablist" aria-orientation="vertical">
                <a
                  className="nav-link active"
                  id="node-custom-tab"
                  data-toggle="pill"
                  href="#addr-p2pkh"
                  role="tab"
                  aria-controls="node-custom"
                  aria-selected="true">
                  Custom RPC method
                </a>
                {/* <a
                className="nav-link"
                id="addr-p2wpkh-tab"
                data-toggle="pill"
                href="#addr-p2wpkh"
                role="tab"
                aria-controls="addr-p2wpkh"
                aria-selected="false"
              >
                P2WPKH
              </a> */}
              </div>
            </div>
            <div className="col-9">
              <div className="tab-content" id="node-methods-tabContent">
                <div className="tab-pane fade show active" id="node-custom" role="tabpanel">
                  <h2>Custom RPC method</h2>
                  <p>Send a custom RPC command method to the node</p>
                  <NodeMethod nodeService={this.nodeService} />
                </div>
                {/* <div className="tab-pane fade" id="addr-p2wsh" role="tabpanel">
                <h2>P2WSH</h2>
                <p>Payment to Witness Script Hash</p>
                <NodeMethod />
              </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default NodeScreen;
