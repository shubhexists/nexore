export type Account = {
  wallets: Wallet;
  cipher: boolean;
  account_name: string;
  uuid: string;
  developer_mode: boolean;
};

export type Nexore = {
  accounts: Account[];
};

export type CurrentMetadata = {
  account: Account;
  autolocktime: number;
  theme: Mode;
};

export enum Mode {
  DARK = 'dark',
  LIGHT = 'light',
}

export type Wallet = {
  active_networks: Partial<Record<SupportedChains, ChainData>>;
};

export enum SupportedChains {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  SOLANA = 'solana',
}

export type ChainData = {
  public_key: string;
  amount_in_units: string;
  rfc_url: string;
};

export type PrivateKeyRingStoreType = {
  keys: PrivKeys[];
};

export type PrivKeys = {
  id: string;
  ciphertext: string;
  iv: string;
  salt: string;
  authTag: string;
  iterations: number;
  keyLength: number;
  digest: string;
};
