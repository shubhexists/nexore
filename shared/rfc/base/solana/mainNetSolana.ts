import { Networks } from '../../constants';
import { makeRpcCall } from '../../utils';
import { AlchemyBase } from '../BaseRFC';
import { SolanaGetBalanceResponse } from './types';

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

    try {
      const result = (await makeRpcCall(this.baseUrl, method, params)) as SolanaGetBalanceResponse;

      if (result?.result?.value !== undefined) {
        return result.result.value.toString();
      }
    } catch (error) {
      console.error(`Failed to get balance for address ${address}:`, error);
    }

    return '0';
  }
}
