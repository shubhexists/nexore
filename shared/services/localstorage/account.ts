import { Account, Mode, Wallet, SupportedChains, ChainData } from '../../configs/AccountConfig';
import { PersistentStorage } from '../storage/persistentStorage';
import { ACCOUNT_STORAGE_KEY } from '../../constants/constants';

class AccountStorage {
  private storage: PersistentStorage<Account>;

  constructor() {
    this.storage = new PersistentStorage<Account>();
  }

  async getAccount(): Promise<Account | undefined> {
    return await this.storage.getItem(ACCOUNT_STORAGE_KEY);
  }

  async setAccount(account: Account): Promise<void> {
    await this.storage.setItem(ACCOUNT_STORAGE_KEY, account);
  }

  async updateAccount(updateFn: (account: Account) => Account): Promise<void> {
    const currentAccount = await this.getAccount();
    if (currentAccount) {
      const updatedAccount = updateFn(currentAccount);
      await this.setAccount(updatedAccount);
    } else {
      throw new Error('No account found to update');
    }
  }

  async addWallet(wallet: Wallet): Promise<void> {
    await this.updateAccount((account) => ({
      ...account,
      wallets: [...account.wallets, wallet],
    }));
  }

  async updateWallet(uuid: string, updateFn: (wallet: Wallet) => Wallet): Promise<void> {
    await this.updateAccount((account) => ({
      ...account,
      wallets: account.wallets.map((w) => (w.uuid === uuid ? updateFn(w) : w)),
    }));
  }

  async removeWallet(uuid: string): Promise<void> {
    await this.updateAccount((account) => ({
      ...account,
      wallets: account.wallets.filter((w) => w.uuid !== uuid),
    }));
  }

  async setTheme(theme: Mode): Promise<void> {
    await this.updateAccount((account) => ({
      ...account,
      theme,
    }));
  }

  async setAutolockTime(autolocktime: number): Promise<void> {
    await this.updateAccount((account) => ({
      ...account,
      autolocktime,
    }));
  }

  async setWalletDeveloperMode(uuid: string, developerMode: boolean): Promise<void> {
    await this.updateWallet(uuid, (wallet) => ({
      ...wallet,
      developer_mode: developerMode,
    }));
  }

  async updateChainData(uuid: string, chain: SupportedChains, chainData: ChainData): Promise<void> {
    await this.updateWallet(uuid, (wallet) => ({
      ...wallet,
      active_networks: {
        ...wallet.active_networks,
        [chain]: chainData,
      },
    }));
  }
}

export const accountStorage = new AccountStorage();
