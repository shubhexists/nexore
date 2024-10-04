import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';
import { EthereumGetBalanceResponse } from './types';

export class SepoliaTestnet extends AlchemyBase {
  constructor() {
    super(Networks.SepoliaTestnet);
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
      const result = (await makeRpcCall(this.baseUrl, method, params)) as EthereumGetBalanceResponse;

      if (result?.result) {
        return BigInt(result.result).toString();
      }
    } catch (error) {
      console.error(`Failed to get balance for address ${address}:`, error);
    }
    return '0';
  }
}
