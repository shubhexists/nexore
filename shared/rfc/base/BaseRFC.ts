import { Networks } from '../constants';

export class AlchemyBase {
  protected baseUrl: string;

  constructor(network: Networks) {
    const base = network;
    const ALCHEMY_API_KEY = process.env.ALCHEMY_API;
    const base_with_key = `${base}${ALCHEMY_API_KEY}`;
    this.baseUrl = base_with_key;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
