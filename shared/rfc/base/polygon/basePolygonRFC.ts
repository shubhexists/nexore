import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';
import { PolygonGetBalanceResponse } from './types';

export class PolygonMainnet extends AlchemyBase {
  constructor() {
    super(Networks.PolygonMainnet);
  }

  async getBalance(address: string) {
    const method = 'eth_getBalance';
    const params = {
      id: 1,
      jsonrpc: '2.0',
      params: [address, 'latest'],
      method,
    };

    try {
      const result = (await makeRpcCall(this.baseUrl, method, params)) as PolygonGetBalanceResponse;

      if (result?.result) {
        return BigInt(result.result).toString();
      }
    } catch (error) {
      console.error(`Failed to get balance for address ${address}:`, error);
    }
    return '0';
  }
}
