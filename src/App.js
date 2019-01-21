import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from './web/HomeScreen';
import CreateTxScreen from './web/tx/CreateTxScreen';
import DecompileASMScreen from './web/script/DecompileASMScreen';
import './web/scss/main.scss';

// icons to be used
library.add(faArrowRight);

const App = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link className="navbar-brand" to="/">
          BF
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/tx/">
                Transaction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/script/">
                Script
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-shrink-0" role="main">
        <div className="container">
          <Route path="/" exact component={() => <HomeScreen />} />
          <Route path="/tx/" component={() => <CreateTxScreen />} />
          <Route path="/script/" component={() => <DecompileASMScreen />} />
        </div>
      </main>
    </div>
  </Router>
);

export default App;
