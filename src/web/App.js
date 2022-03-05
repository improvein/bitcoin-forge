import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretRight,
  faCogs,
  faExclamationTriangle,
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomeScreen from './HomeScreen';
import DecodeTxScreen from './tx/DecodeTxScreen';
import CreateTxScreen from './tx/CreateTxScreen';
import CreateAddressScreen from './address/CreateAddressScreen';
import DecompileASMScreen from './script/DecompileASMScreen';
import CreateScriptScreen from './script/CreateScriptScreen';
import CreateMiniscriptScreen from './script/CreateMiniscriptScreen';
import HashScreen from './cryptography/HashScreen';
import KeysScreen from './cryptography/KeysScreen';
import MoreToolsScreen from './tools/MoreToolsScreen';

import bfLogo from './images/bf_logo.svg';
import 'bootstrap';
import './scss/main.scss';

import projectPackage from '../../package.json';

// icons to be used
library.add(
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretRight,
  faExclamationTriangle,
  faCogs,
  faGithub,
  faMinusCircle,
  faPlusCircle,
  faTrash,
);

function App() {
  return (
    <Router basename="/">
      <>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={bfLogo} alt="BF" width="30" height="30" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="transactions-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Transactions
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="transactions-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/tx/decode">
                        Decode a tx
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/tx/forge">
                        Create a tx
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="address-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Address
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="address-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/address/create">
                        Create
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="scripts-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Scripts
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="scripts-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/script/decompile-asm">
                        Decompile ASM
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/script/create">
                        Forge / Create
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/script/create-miniscript">
                        Miniscript
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="cryptography-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Cryptography
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="cryptography-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/cryptography/hash">
                        Hash
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/cryptography/keys">
                        Keys
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/more-tools">
                    More tools
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/improvein/bitcoin-forge" title="GitHub repo">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="flex-shrink-0 pb-3" role="main">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<HomeScreen />} />
              {/* Transactions */}
              <Route path="/tx/decode" element={<DecodeTxScreen />} />
              <Route path="/tx/forge" element={<CreateTxScreen />} />
              {/* Address */}
              <Route path="/address/create" element={<CreateAddressScreen />} />
              {/* Scripting */}
              <Route path="/script/decompile-asm" element={<DecompileASMScreen />} />
              <Route path="/script/create" element={<CreateScriptScreen />} />
              <Route path="/script/create-miniscript" element={<CreateMiniscriptScreen />} />
              {/* Cryptography */}
              <Route path="/cryptography/hash" element={<HashScreen />} />
              <Route path="/cryptography/keys" element={<KeysScreen />} />
              {/* More tools */}
              <Route path="/more-tools" element={<MoreToolsScreen />} />
            </Routes>
          </div>
        </main>
        <footer className="footer mt-auto py-3">
          <div className="container">
            <span className="text-muted float-end">{`v${projectPackage.version}`}</span>
            <span className="text-muted">
              The Bitcoin Forge is developed with ❤️+💻 by <a href="https://www.improvein.com">Improve-in</a>
            </span>
          </div>
        </footer>
      </>
    </Router>
  );
}

export default App;
