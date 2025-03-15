# LSC - Storage

`lsc-storage` is a simple JavaScript library designed to help you manage data in the browser's local storage, session storage, and cookies. It provides easy-to-use functions for storing and retrieving data in a consistent manner.

## Features

- Store and retrieve data from **local storage**
- Automatically handles errors such as quota exceeded
- Supports asynchronous operations for better performance

## Installation

You can install `lsc-storage` via npm:

```bash
npm install lsc-storage
```

## Usage

**Store Data in Local Storage**
To store data in local storage, pass the key and value as arguments:

```ts
import { lsc } from "lsc-storage";
type User = {
  name: string;
  age: 25;
};

lsc.set("user", { name: "John Doe", age: 25 }); // lsc-storage is enough expert to knows the type
lsc.get<User>("user", { name: "John Doe", age: 25 });
```

**Retrieve Data from Local Storage**
To retrieve stored data, pass only the key:

```ts
import { lsc } from "lsc-storage";

const user = lsc.get("user");
console.log(user); // { name: "John Doe", age: 25 }
```

## Error Handling

If an error occurs (e.g., exceeding the storage quota), it will be logged to the console:

```txt
Storage is full, please clear some space!
```

# API Reference

#### `set<T>(key: string, value: T, localConfig?: Omit<StorageConfig, 'storage'>): void | boolean`

Stores a value in storage under the specified key.

- **Parameters:**

  - `key` (string): The key under which the value is stored.
  - `value` (T): The value to store.
  - `localConfig` (Optional): Configuration object to override default settings, excluding the `storage` property.

- **Returns:** `void` if the operation is successful, or `boolean` (`false`) if an error occurs during storage.

#### `get<T>(key: string, localConfig?: Omit<StorageConfig, 'storage'>): T | null`

Retrieves the value associated with the specified key.

- **Parameters:**

  - `key` (string): The key of the item to retrieve.
  - `localConfig` (Optional): Configuration object to override default settings, excluding the `storage` property.

- **Returns:** The value associated with the key, or `null` if the key does not exist or an error occurs during retrieval.

#### `remove(key: string): void`

Removes the item associated with the specified key from storage.

- **Parameters:**

  - `key` (string): The key of the item to remove.

- **Returns:** `void`

#### `clear(): void`

Clears all items from storage.

- **Returns:** `void`

#### `flush(force?: boolean): void`

Clears expired items from storage. If `force` is `true`, all items are cleared regardless of expiration.

- **Parameters:**

  - `force` (Optional, boolean): If `true`, all items are cleared. Defaults to `false`.

- **Returns:** `void`

## `localMemoryStore`

A utility function that creates an in-memory storage object implementing the `Storage` interface. This is used as a fallback when the desired storage is unavailable.

```typescript
const memoryStorage = localMemoryStore();
memoryStorage.setItem("key", "value");
console.log(memoryStorage.getItem("key")); // Outputs: 'value'
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Issues

If you encounter any bugs or issues, please open an issue on the [GitHub Issues](https://github.com/devlopersabbir/lsc-storage/issues).

## Author

- **Name**: Sabbir Hossain Shuvo
- **Email**: devlopersabbir@gmail.com
- **GitHub**: [@devlopersabbir](https://github.com/devlopersabbir)
- **Buy Me a Coffee**: [@devlopersabbir](https://buymeacoffee.com/devlopersabbir)

## Links

- [Repository](https://github.com/devlopersabbir/lsc-storage)
- [Homepage](https://github.com/devlopersabbir/lsc-storage#readme)

```

```
