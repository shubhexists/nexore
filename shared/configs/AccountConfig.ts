export type Account = {
  wallets: Wallet[];
  autolocktime: number;
  theme: Mode;
};

export enum Mode {
  DARK = 'dark',
  LIGHT = 'light',
}

export type Wallet = {
  uuid: string;
  account_name: string;
  developer_mode: boolean;
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
  amount_in_dollars: string;
  rfc_url: string;
};
