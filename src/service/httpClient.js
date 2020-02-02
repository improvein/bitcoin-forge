const makeRequest = async (method, url, body, headers) => {
  const defaultHeaders = {};

  const response = await fetch(url, {
    mode: 'cors',
    method,
    headers: { ...defaultHeaders, headers },
    body,
  });

  if (!response.ok) {
    throw response;
  }

  return response;
};

const get = async (url, headers) => {
  return makeRequest('GET', url, null, headers);
};

const post = async (url, body, headers) => {
  return makeRequest('POST', url, body, headers);
};

export default {
  get,
  post,
};
