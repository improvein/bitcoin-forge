import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tools from './tools.json';

class MoreToolsScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>More tools</h1>
        <p>Additional third-party tools that can be very useful (sorted alphabetically).</p>

        {tools.map((tool) => (
          <div className="card mb-2" key={tool.name}>
            <div className="card-body">
              <h5 className="card-title">
                {tool.name}
                <br />
              </h5>
              <h6 className="card-subtitle text-muted mb-3">
                by{' '}
                {tool.authors.map((author) => (
                  <a href={author.url} key={author.url}>{author.name}</a>
                ))}
              </h6>
              <a href={tool.url} target="_blank" rel="nonoopener noreferrer">
                {tool.url}
              </a>
              <p className="card-text">{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default MoreToolsScreen;
