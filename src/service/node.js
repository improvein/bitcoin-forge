import httpClient from './httpClient';

class NodeService {
  constructor(host, port, user, pass) {
    this.protocol = 'http';
    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
  }

  /**
   * Just test the connection.
   * TODO: do something eventually
   */
  async connect() {
    return true;
  }

  async rpcSend(method, params = []) {
    // prepare header
    const headers = {
      'Access-Control-Allow-Origin': '*',
      cache: 'no-cache',
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.user}:${this.pass}`)}`,
    };
    // prepare body
    const bodyJson = {
      jsonrpc: '1.0',
      id: 'curltest',
      method,
      params,
    };
    const body = JSON.stringify(bodyJson);

    // prepare URL with credentials
    // const url = `${this.protocol}://${this.user}:${this.pass}@${this.host}:${this.port}`;
    const url = `${this.protocol}://${this.host}:${this.port}`;

    const response = await httpClient.post(url, body, headers);
    return response.json();
  }
}

export default NodeService;
