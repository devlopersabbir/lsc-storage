import { KeyValuePair } from "@/@types";

/**
 * Creates an in-memory storage fallback.
 *
 * @returns {Storage} An in-memory storage object mimicking localStorage.
 *
 * @example
 * const memoryStore = localMemoryStore();
 * memoryStore.setItem("key", "value");
 */
export const localMemoryStore = (): Storage => {
  const storage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = { __proto__: storage };
    },
  };

  let store: KeyValuePair = { __proto__: storage };
  return store as Storage;
};
