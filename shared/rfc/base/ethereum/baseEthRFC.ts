import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';

export class EthMainNet extends AlchemyBase {
  constructor() {
    super(Networks.EthMainNet);
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
