/**
 * Store data in local storage
 * @param {string} key The key to store the data in local storage
 * @param {T} value The value to store in local storage
 * @returns {Promise<void>} Returns nothing
 *
 * @example
 * // Store data in local storage
 * await lscStorage("user", { name: "John Doe", age: 25 });
 */
export async function lscStorage<T extends Record<string, any>>(
  key: string,
  value: T
): Promise<void>;

/**
 * Retrieve data from local storage
 * @param {string} key The key to retrieve data from local storage
 * @returns {Promise<T | null>} Returns the data stored in local storage or null if no data is found
 *
 * @example
 * // Retrieve data from local storage
 * const user = await lscStorage("user");
 * console.log(user); // { name: "John Doe", age: 25 }
 */
export async function lscStorage<T extends Record<string, any>>(
  key: string
): Promise<T | null>;

/**
 * Store or retrieve data from local storage
 * @param {string} key The key to store or retrieve data in local storage
 * @param {T} value The value to store in local storage (optional, only needed for storing)
 * @returns {Promise<T | void>} Returns the data stored in local storage or undefined if no data is found
 *
 * @example
 * // Store data in local storage
 * await lscStorage("user", { name: "John Doe", age: 25 });
 *
 * // Retrieve data from local storage
 * const user = await lscStorage("user");
 * console.log(user); // { name: "John Doe", age: 25 }
 */
export async function lscStorage<T extends Record<string, any>>(
  key: string,
  value?: T
): Promise<T | string> {
  try {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
      return `${key} stored in local storage!`;
    } else {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          return JSON.parse(data) as T;
        } catch (error) {
          console.error("Failed to parse the data from local storage", error);
          return "Failed to parse the data from local storage";
        }
      }
      return "No data found in local storage";
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.log("Storage is full, please clear some space!");
    } else {
      console.error("Error accessing local storage", error);
    }
    return "Error accessing local storage";
  }
}
