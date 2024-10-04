export interface SolanaGetBalanceResponse {
  jsonrpc: string;
  result: {
    context: {
      apiVersion: string;
      slot: number;
    };
    value: bigint;
  };
  id: number;
}
