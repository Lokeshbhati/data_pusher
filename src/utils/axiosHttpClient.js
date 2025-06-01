import axios from 'axios';

class AxiosHttpClient {
  static async getRequest(url, queryParams = {}, headers= {}) {
    try {
      console.log("Function called: getRequest");
      console.log(`Data passed: ${JSON.stringify({url,queryParams,headers})}`);
      const response = await axios.get(url, { params: queryParams, headers });
      console.log(`Call successful, response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.error('GET request failed:', error.message);
      throw error;
    }
  }

  static async postRequest(url, body = {}, headers = {}) {
    try {
      console.log("Function called: postRequest");
      console.log(`Data passed: ${JSON.stringify({url,body,headers})}`);
      const response = await axios.post(url, body, {headers});
      console.log(`Call successful, response recieved: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.error('POST request failed:', error.message);
      throw error;
    }
  }
}

export default AxiosHttpClient;