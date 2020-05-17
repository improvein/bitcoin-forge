import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cryptoService from '../../service/cryptography';

import { Button, HexInput, HexInputField, SelectInputField } from '../components';

class KeysScreen extends Component {
  constructor() {
    super();
    this.state = {
      privateKey: '',
      keyCompressed: false,
      ecPair: null,
      genKeyErrorMessage: '',
      signContent: '',
      signature: '',
      signErrorMessage: '',
    };

    this.onPrivateKeyChange = this.onPrivateKeyChange.bind(this);
    this.onKeyCompressedChange = this.onKeyCompressedChange.bind(this);
    this.onSignContentChange = this.onSignContentChange.bind(this);
    this.onGeneratePubClick = this.onGeneratePubClick.bind(this);
    this.onGenerateRandomClick = this.onGenerateRandomClick.bind(this);
    this.onSignClick = this.onSignClick.bind(this);

    this.generatePublicKey = this.generatePublicKey.bind(this);
  }

  onPrivateKeyChange(event) {
    const privateKey = event.target.value;

    this.setState({
      privateKey,
    });
  }

  onKeyCompressedChange(event) {
    const keyCompressed = event.target.checked;

    this.setState({
      keyCompressed,
    });
  }

  onSignContentChange(event) {
    const signContent = event.target.value;

    this.setState({
      signContent,
    });
  }

  onGeneratePubClick(event) {
    const { privateKey } = this.state;

    if (privateKey == '') {
      this.setState({
        ecPair: null,
        genKeyErrorMessage: 'The private key cannot be empty.',
      });
    } else {
      this.generatePublicKey(privateKey);
    }
  }

  onGenerateRandomClick(event) {
    const { keyCompressed } = this.state;

    this.generatePublicKey();
  }

  onSignClick(event) {
    const { signContent, ecPair } = this.state;

    if (ecPair == null) {
      this.setState({
        signature: null,
        signErrorMessage: 'The keys cannot be empty.',
      });
    } else {
      try {
        const contentBuffer = Buffer.from(signContent, 'utf8');

        const signature = cryptoService.signContent(contentBuffer, 'sha256', ecPair);

        this.setState({
          signature,
          signErrorMessage: '',
        });
      } catch (err) {
        console.error('Signing', err);
        this.setState({
          signature: null,
          signErrorMessage: err.message,
        });
      }
    }
  }

  /**
   * Hash the content entered by the user with the different algos
   * @param {string} privateKey
   */
  generatePublicKey(privateKey) {
    const { keyCompressed } = this.state;
    try {
      const ecPair = cryptoService.generateECPair(privateKey, keyCompressed);

      this.setState({
        privateKey: ecPair.privateKey.toString('hex'),
        ecPair,
        genKeyErrorMessage: '',
      });
    } catch (err) {
      console.error('Generating keys', err);
      this.setState({
        privateKey,
        ecPair: null,
        genKeyErrorMessage: err.message,
      });
    }
  }

  render() {
    const { ecPair, keyCompressed, privateKey, genKeyErrorMessage, signContent, signature, signErrorMessage } = this.state;

    return (
      <div>
        <h1>Keys and Signature</h1>
        <p>Generate private and public keys using ECDSA (secp256k1). Test signatures.</p>

        <form id="keys-form" className="">
          <div className="">
            <label htmlFor="privateKey">Private key</label>
            <div className="row mb-1">
              <div className="col">
                <HexInput id="privateKey" value={privateKey} onChange={this.onPrivateKeyChange} />
              </div>
              <div className="col-sm-auto">
                <Button text="Random key generation" btnClass="secondary" onClick={this.onGenerateRandomClick} />
              </div>
            </div>
            <Button text="Generate Public Key (from private key)" btnClass="primary" onClick={this.onGeneratePubClick} />
            <div className="form-check form-check-inline mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="key-compressed"
                value={keyCompressed}
                onChange={this.onKeyCompressedChange}
              />
              <label className="form-check-label" htmlFor="key-compressed">
                Compressed
              </label>
            </div>
            {genKeyErrorMessage && <p className="text-danger">{genKeyErrorMessage}</p>}
            <hr />
            <h6>Public key</h6>
            <div className="row">
              <div className="col-sm-6">
                <label>Hexadecimal</label>
                <textarea className="form-control" rows="4" readOnly value={ecPair ? ecPair.publicKey.toString('hex') : ''} />
              </div>
              <div className="col-sm-6">
                <label>Base64</label>
                <textarea className="form-control" rows="4" readOnly value={ecPair ? ecPair.publicKey.toString('base64') : ''} />
              </div>
            </div>
          </div>
        </form>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">
              Signatures <span className="badge badge-warning">(BETA)</span>
            </h5>

            <div className="form-group">
              <label htmlFor="txhexa">Text content to be signed</label>
              <textarea
                id="signContent"
                name="signContent"
                className="form-control"
                rows="5"
                value={signContent}
                onChange={this.onSignContentChange}
              />
            </div>
            <Button text="Sign" btnClass="primary" onClick={this.onSignClick} />
            {signErrorMessage && <p className="text-danger">{signErrorMessage}</p>}
            <hr />
            <div>
              <h6>Signature (of content hashed with SHA-256)</h6>
              <div className="row">
                <div className="col-sm-6">
                  <label>Hexadecimal</label>
                  <textarea className="form-control" rows="4" readOnly value={signature ? signature.toString('hex') : ''} />
                </div>
                <div className="col-sm-6">
                  <label>Base64</label>
                  <textarea className="form-control" rows="4" readOnly value={signature ? signature.toString('base64') : ''} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default KeysScreen;
