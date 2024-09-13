type StorageGetResult<T> = { [key: string]: T };

interface BaseStorageArea<T> {
  get(key: string | string[]): Promise<StorageGetResult<T>>;
  set(items: StorageGetResult<T>): Promise<void>;
  remove(key: string | string[]): Promise<void>;
  clear(): Promise<void>;
}

export class BaseStorage<T> {
  protected storage: BaseStorageArea<T>;

  constructor(storage: BaseStorageArea<T>) {
    this.storage = storage;
  }

  async getItem(key: string): Promise<T | undefined> {
    try {
      const result = await this.storage.get(key);
      return result[key];
    } catch (error) {
      throw new Error(`Failed to get item: ${error}`);
    }
  }

  async setItem(key: string, value: T): Promise<void> {
    try {
      await this.storage.set({ [key]: value });
    } catch (error) {
      throw new Error(`Failed to set item: ${error}`);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
    } catch (error) {
      throw new Error(`Failed to remove item: ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (error) {
      throw new Error(`Failed to clear storage: ${error}`);
    }
  }
}
