import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cryptoService from '../../service/cryptography';

import { HexInputField, SelectInputField } from '../components';

class HashScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputFormat: 'utf8',
      hashContent: '',
      hashResult: {},
      errorMessage: '',
    };

    this.onHashContentChange = this.onHashContentChange.bind(this);
    this.onInputFormatChange = this.onInputFormatChange.bind(this);
    this.doHash = this.doHash.bind(this);
  }

  onInputFormatChange(event) {
    const inputFormat = event.target.value;

    const { hashContent } = this.state;

    this.doHash(inputFormat, hashContent);
  }

  onHashContentChange(event) {
    const hashContent = event.target.value;

    if (hashContent === '') {
      this.setState({
        hashContent,
        hashResult: {},
        errorMessage: '',
      });
      return;
    }

    const { inputFormat } = this.state;

    this.doHash(inputFormat, hashContent);
  }

  /**
   * Hash the content entered by the user with the different algos
   * @param {string} inputFormat
   * @param {string} hashContent
   */
  doHash(inputFormat, hashContent) {
    try {
      // check if content has valid input format
      if (inputFormat === 'hex') {
        if (!/^[0-9a-fA-F]*$/g.test(hashContent)) {
          const formatError = new Error(`The content is not in the correct format: ${inputFormat}`);
          throw formatError;
        }
      }

      const algos = ['sha1', 'sha256', 'ripemd160', 'hash160'];
      const hashContentBuffer = Buffer.from(hashContent, inputFormat);
      const hashResult = cryptoService.hash(algos, hashContentBuffer);

      this.setState({
        inputFormat,
        hashContent,
        hashResult,
        errorMessage: '',
      });
    } catch (err) {
      console.error('Hashing content', err);
      this.setState({
        inputFormat,
        hashContent,
        hashResult: {},
        errorMessage: err.message,
      });
    }
  }

  render() {
    const { hashResult, inputFormat, errorMessage } = this.state;

    const inputFormats = [
      { value: 'utf8', text: 'Text (UTF-8)' },
      { value: 'hex', text: 'Hexadecimal' },
    ];

    return (
      <div>
        <h1>Hash functions</h1>
        <p>
          A{' '}
          <a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function" target="_blank">
            cryptographic hash function (CHF)
          </a>{' '}
          is a hash function that is suitable for use in cryptography. It is a mathematical algorithm that maps data of arbitrary size
          (often called the "message") to a bit string of a fixed size (the "hash value", "hash", or "message digest") and is a one-way
          function, that is, a function which is practically infeasible to invert.
        </p>

        <form id="decodetx-form" className="">
          <div className="">
            <div className="form-group mb-3">
              <label htmlFor="txhexa">Content to be hashed</label>
              <textarea id="hashcontent" name="hashcontent" className="form-control" rows="5" onChange={this.onHashContentChange} />
            </div>
            <SelectInputField
              id="input-format"
              label="Content format"
              horizontal={true}
              choices={inputFormats}
              value={inputFormat}
              onChange={this.onInputFormatChange}
            />
          </div>
        </form>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Result</h5>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="hash-result">
              <HexInputField id="result-sha1" label="SHA-1" horizontal={true} readOnly={true} value={hashResult.sha1} />
              <HexInputField id="result-sha256" label="SHA-256 (SHA-2)" horizontal={true} readOnly={true} value={hashResult.sha256} />
              <HexInputField id="result-ripemd160" label="RIPEMD-160" horizontal={true} readOnly={true} value={hashResult.ripemd160} />
              <HexInputField
                id="result-hash160"
                label="HASH160"
                helpMessage="RIPEMD-160( SHA-256( content ) )"
                horizontal={true}
                readOnly={true}
                value={hashResult.hash160}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HashScreen;
