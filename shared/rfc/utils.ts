import axios from 'axios';

export async function makeRpcCall(url: string, method: string, params: object): Promise<object> {
  try {
    const response = await axios.post(url, params, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error calling ${method}:`, error);
    throw error;
  }
}
