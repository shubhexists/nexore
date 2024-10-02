import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';

export class SolanaMainnet extends AlchemyBase {
  constructor() {
    super(Networks.SolanaMainnet);
  }

  async getBalance(address: string) {
    const method = 'getBalance';
    const params = {
      id: 1,
      jsonrpc: '2.0',
      params: [address],
      method,
    };
    return await makeRpcCall(this.baseUrl, method, params);
  }
}
