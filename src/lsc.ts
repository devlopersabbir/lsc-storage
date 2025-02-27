import { CallBack, ConfigStorage, ExpireAt } from "./@types";

class Lsc {
  private storage: Storage | undefined;
  private config: ConfigStorage = {
    storage: localStorage,
    secret: "sabbir",
    decrypt: false,
    encrypt: false,
    expireAt: "10m",
  };

  constructor(config?: Partial<ConfigStorage>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    this.storage = this.config.storage;
  }

  private getExpiryTime(expireAt?: ExpireAt): number {
    const now = Date.now();
    if (!expireAt) return 0;

    const timeMap: Record<string, number> = {
      "1m": 60 * 1000,
      "2m": 2 * 60 * 1000,
      "3m": 3 * 60 * 1000,
      "4m": 4 * 60 * 1000,
      "5m": 5 * 60 * 1000,
      "10m": 10 * 60 * 1000,
      "15m": 15 * 60 * 1000,
      "20m": 20 * 60 * 1000,
    };

    return now + (timeMap[expireAt as string] || 0);
  }

  public set<T = unknown>(
    key: string,
    value: T,
    localConfig: Partial<ConfigStorage> = {},
    callBack?: (value: CallBack<T>) => void
  ): void {
    const _config: ConfigStorage = { ...this.config, ...localConfig };
    const expireAt = this.getExpiryTime(_config.expireAt);

    try {
      const data = JSON.stringify({ value, expireAt });
      this.storage?.setItem(key, data);

      callBack?.({
        message: "Item set successfully in storage",
        status: 200,
        value,
      });
    } catch {
      callBack?.({
        message: "Failed to set item in storage",
        status: 400,
        value: null,
      });
    }
  }

  public get<T = unknown>(key: string, localConfig: Partial<ConfigStorage> = {}): T | null {
    const _config: ConfigStorage = { ...this.config, ...localConfig };
    const item = this.storage?.getItem(key);
    if (!item) return null;

    try {
      const { value, expireAt } = JSON.parse(item);
      if (expireAt && Date.now() > expireAt) {
        this.remove(key);
        return null;
      }
      return value as T;
    } catch {
      return null;
    }
  }

  public remove(key: string, callBack?: (error?: Error) => void): void {
    try {
      this.storage?.removeItem(key);
      callBack?.();
    } catch (error) {
      callBack?.(error as Error);
    }
  }

  public clear(): void {
    this.storage?.clear();
  }
}

export default new Lsc();
