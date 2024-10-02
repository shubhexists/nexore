export const ETH_BASE_URL = 'https://eth-mainnet.g.alchemy.com/v2/';
export const SOLANA_MAIN_URL = 'https://solana-mainnet.g.alchemy.com/v2/';
export const ETH_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2/';
export const SOLANA_DEV_URL = 'https://solana-devnet.g.alchemy.com/v2/';
export const POLYGON_MAIN_URL = 'https://polygon-mainnet.g.alchemy.com/v2/';
export const POLYGON_AMOY_URL = 'https://polygon-amoy.g.alchemy.com/v2/';

export enum Networks {
  EthMainNet = ETH_BASE_URL,
  SepoliaTestnet = ETH_SEPOLIA_URL,
  SolanaMainnet = SOLANA_MAIN_URL,
  SolanaDevnet = SOLANA_DEV_URL,
  PolygonMainnet = POLYGON_MAIN_URL,
  PolygonAmoy = POLYGON_AMOY_URL,
}
