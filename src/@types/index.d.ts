type ExpireHelper<T extends string> = T | Omit<string, T>;
export type ExpireAt = ExpireHelper<"1m" | "2m" | "3m" | "4m" | "5m" | "10m" | "15m" | "20m">;

export type ConfigStorage = {
  storage: Storage | undefined;
  encrypt?: boolean;
  decrypt?: boolean;
  secret?: string;
  expireAt?: ExpireAt;
};
export type CallBack<T> = {
  message: string;
  status: number;
  value: T | null;
};
