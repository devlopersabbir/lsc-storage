/**
 * Defines a generic key-value pair type.
 * @template T The type of stored values.
 */
export type KeyValuePair<T = unknown> = Record<string, T>;

/**
 * Defines the storage configuration options.
 */
export interface StorageConfig {
  storage?: Storage;
  ttl?: number | null;
}
