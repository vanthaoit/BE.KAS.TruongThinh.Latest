import axios from 'axios';

class HTTPServiceBase {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }

  put(url, body) {
    return this.instance.put(url, body, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new HTTPServiceBase();
