import React, { Component } from 'react';

import CreateP2PKH from './CreateP2PKH';
import CreateP2WPKH from './CreateP2WPKH';
import CreateP2SHP2WPKH from './CreateP2SHP2WPKH';
import CreateMultisigP2SH from './CreateMultisigP2SH';
import CreateMultisigP2WSH from './CreateMultisigP2WSH';
import CreateMultisigP2SHP2WSH from './CreateMultisigP2SHP2WSH';
import CreateP2SH from './CreateP2SH';
import CreateP2WSH from './CreateP2WSH';

class CreateAddressScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Create an Address</h1>
        <p>Forge an address of the selected type.</p>
        <div className="row">
          <div className="col-3">
            <div className="nav flex-column nav-pills" id="addr-types-tab" role="tablist" aria-orientation="vertical">
              <a
                className="nav-link active"
                id="addr-p2pkh-tab"
                data-bs-toggle="pill"
                href="#addr-p2pkh"
                role="tab"
                aria-controls="addr-p2pkh"
                aria-selected="true">
                P2PKH
              </a>
              <a
                className="nav-link"
                id="addr-p2wpkh-tab"
                data-bs-toggle="pill"
                href="#addr-p2wpkh"
                role="tab"
                aria-controls="addr-p2wpkh"
                aria-selected="false">
                P2WPKH
              </a>
              <a
                className="nav-link"
                id="addr-p2sh-p2wpkh-tab"
                data-bs-toggle="pill"
                href="#addr-p2sh-p2wpkh"
                role="tab"
                aria-controls="addr-p2sh-p2wpkh"
                aria-selected="false">
                P2PH-P2WPKH
              </a>
              <a
                className="nav-link"
                id="addr-multisig-p2sh-tab"
                data-bs-toggle="pill"
                href="#addr-multisig-p2sh"
                role="tab"
                aria-controls="addr-multisig-p2sh"
                aria-selected="false">
                Multisig P2SH
              </a>
              <a
                className="nav-link"
                id="addr-multisig-p2wsh-tab"
                data-bs-toggle="pill"
                href="#addr-multisig-p2wsh"
                role="tab"
                aria-controls="addr-multisig-p2wsh"
                aria-selected="false">
                Multisig P2WSH (SegWit)
              </a>
              <a
                className="nav-link"
                id="addr-multisig-p2sh-p2wsh-tab"
                data-bs-toggle="pill"
                href="#addr-multisig-p2sh-p2wsh"
                role="tab"
                aria-controls="addr-multisig-p2sh-p2wsh"
                aria-selected="false">
                Multisig P2SH-P2WSH (SegWit)
              </a>
              <a
                className="nav-link"
                id="addr-p2sh-tab"
                data-bs-toggle="pill"
                href="#addr-p2sh"
                role="tab"
                aria-controls="addr-p2sh"
                aria-selected="false">
                P2SH
              </a>
              <a
                className="nav-link"
                id="addr-p2wsh-tab"
                data-bs-toggle="pill"
                href="#addr-p2wsh"
                role="tab"
                aria-controls="addr-p2wsh"
                aria-selected="false">
                P2WSH
              </a>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="addr-types-tabContent">
              <div className="tab-pane fade show active" id="addr-p2pkh" role="tabpanel">
                <h2>P2PKH</h2>
                <p>Payment to Public Key Hash</p>
                <CreateP2PKH />
              </div>
              <div className="tab-pane fade" id="addr-p2wpkh" role="tabpanel">
                <h2>P2WPKH</h2>
                <p>Payment to Witness Public Key Hash (SegWit)</p>
                <CreateP2WPKH />
              </div>
              <div className="tab-pane fade" id="addr-p2sh-p2wpkh" role="tabpanel">
                <h2>P2SH-P2WPKH</h2>
                <p>Payment to Witness Public Key Hash, wrapped in P2SH (SegWit)</p>
                <CreateP2SHP2WPKH />
              </div>
              <div className="tab-pane fade" id="addr-multisig-p2sh" role="tabpanel">
                <h2>Multisig P2SH</h2>
                <p>Payment to Multi Signature using P2SH</p>
                <CreateMultisigP2SH />
              </div>
              <div className="tab-pane fade" id="addr-multisig-p2wsh" role="tabpanel">
                <h2>Multisig P2WSH (SegWit)</h2>
                <p>Payment to Multi Signature using P2WSH (Payment to Witness Script Hash)</p>
                <CreateMultisigP2WSH />
              </div>
              <div className="tab-pane fade" id="addr-multisig-p2sh-p2wsh" role="tabpanel">
                <h2>Multisig P2SH-P2WSH (SegWit)</h2>
                <p>Payment to Multi Signature using P2WSH, wrapped in P2SH</p>
                <CreateMultisigP2SHP2WSH />
              </div>
              <div className="tab-pane fade" id="addr-p2sh" role="tabpanel">
                <h2>P2SH</h2>
                <p>Payment to Script Hash</p>
                <CreateP2SH />
              </div>
              <div className="tab-pane fade" id="addr-p2wsh" role="tabpanel">
                <h2>P2WSH</h2>
                <p>Payment to Witness Script Hash</p>
                <CreateP2WSH />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateAddressScreen;
