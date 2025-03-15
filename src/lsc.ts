/**
 * Lightweight Storage Controller (LSC-Storage)
 * A simple wrapper around localStorage with fallback to in-memory storage.
 * Supports generic types for flexibility and optional TTL (time-to-live) configurations.
 *
 * @module LscStorage
 */

import { StorageConfig } from "./@types";
import { localMemoryStore } from "./helper";

/**
 * A class for managing local storage with automatic fallback to an in-memory store.
 */
class LscStorage {
  private init: boolean;
  private storage: Storage;

  constructor() {
    this.init = false;
    this.storage = globalThis.localStorage;
    this.main();
  }

  /**
   * Initializes the storage system, detecting the available storage type.
   * Falls back to an in-memory store if localStorage is unavailable.
   * @private
   */
  private main() {
    if (this.init) return;
    this.init = true;

    try {
      this.storage = this.config().storage || localStorage;
      this.storage.getItem(""); // Test access
    } catch {
      this.storage = localMemoryStore();
    }

    this.flush();
  }

  /**
   * Stores a value in storage.
   * @template T The type of the value being stored.
   * @param {string} key - The key under which the value is stored.
   * @param {T} value - The value to store.
   * @param {Omit<StorageConfig, "storage">} [localConfig={}] - Optional local configuration.
   * @returns {void | boolean} Returns false if storage fails.
   *
   * @example
   * lscStorage.set("username", "JohnDoe");
   * lscStorage.set<number>("age", 30);
   */
  public set<T = unknown>(
    key: string,
    value: T,
    localConfig: Omit<StorageConfig, "storage"> = {}
  ): void | boolean {
    this.main();
    const _config = { ...this.config(), ...localConfig };
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch {
      return false;
    }
  }

  /**
   * Retrieves a stored value.
   * @template T The expected type of the stored value.
   * @param {string} key - The key of the stored value.
   * @param {Omit<StorageConfig, "storage">} [localConfig={}] - Optional local configuration.
   * @returns {T | null} The retrieved value or null if not found.
   *
   * @example
   * const username = lscStorage.get<string>("username");
   * const age = lscStorage.get<number>("age");
   */
  public get<T = unknown>(
    key: string,
    localConfig: Omit<StorageConfig, "storage"> = {}
  ): T | null {
    this.main();
    const _config = { ...this.config(), ...localConfig };
    try {
      const str = this.storage.getItem(key);
      return str ? (JSON.parse(str) as T) : null;
    } catch {
      return null;
    }
  }

  /**
   * Clears all stored items.
   * @param {boolean} [force=false] - If true, forcibly removes all keys.
   *
   * @example
   * lscStorage.flush(); // Clears non-essential items
   * lscStorage.flush(true); // Clears all stored items
   */
  public flush(force = false): void {
    this.main();
    for (const key of Object.keys(this.storage)) {
      try {
        if (force) this.storage.removeItem(key);
      } catch {
        continue;
      }
    }
  }

  /**
   * Removes a specific item from storage.
   * @param {string} key - The key to remove.
   *
   * @example
   * lscStorage.remove("username");
   */
  public remove(key: string): void {
    this.main();
    this.storage.removeItem(key);
  }

  /**
   * Clears all stored data.
   *
   * @example
   * lscStorage.clear();
   */
  public clear(): void {
    this.main();
    this.storage.clear();
  }

  /**
   * Retrieves the default storage configuration.
   * @private
   * @returns {StorageConfig} The storage configuration.
   */
  private config(): StorageConfig {
    return { ttl: null, storage: undefined };
  }
}

export default new LscStorage();
