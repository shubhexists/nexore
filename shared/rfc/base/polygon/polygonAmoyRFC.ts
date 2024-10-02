import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';

export class PolygonAmoy extends AlchemyBase {
  constructor() {
    super(Networks.PolygonAmoy);
  }

  async getAccountInfo(address: string) {
    const method = 'eth_getBalance';
    const params = {
      id: 1,
      jsonrpc: '2.0',
      params: [address, 'latest'],
      method,
    };
    return await makeRpcCall(this.baseUrl, method, params);
  }
}
