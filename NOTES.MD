# 🚀 lsc-storage

A lightweight storage library that makes managing your web storage a breeze! 🌟  
Currently supports **local storage** with plans for **session storage** and **cookie storage** in future releases.

[![npm version](https://img.shields.io/npm/v/lsc-storage.svg)](https://www.npmjs.com/package/lsc-storage) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)[![GitHub issues](https://img.shields.io/github/issues/devlopersabbir/lsc-storage?style=flat-square&logo=github)](https://github.com/devlopersabbir/lsc-storage/issues)[![GitHub stars](https://img.shields.io/github/stars/devlopersabbir/lsc-storage?style=flat-square&logo=github)](https://github.com/devlopersabbir/lsc-storage/stargazers)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Examples](#basic-examples)
  - [API Reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Future Enhancements](#future-enhancements)

---

## Features

- **Unified API**: Simple methods to interact with your storage.
- **TypeScript Support**: Enjoy type safety and IntelliSense.
- **Fallback Mechanism**: Automatically falls back to an in-memory storage if `localStorage` is unavailable.
- **Extensible**: Easily add support for session storage and cookie storage in future updates.

---

## Installation

Install via npm:

```bash
npm install lsc-storage
```

## Usage

### Importing the Library

```typescript
import { lsc } from "lsc-storage";
```

# Basic Examples for lsc-storage

## Storing Data

```typescript
// Store a simple string
lsc.set("username", "john_doe");

// Store an object
lsc.set("user", { name: "John Doe", age: 30 });
```

## Retrieving Data

```ts
// Retrieve a string value
const username = lsc.get<string>("username");

// Retrieve an object
const user = lsc.get<{ name: string; age: number }>("user");
```

## Removing Data

```ts
// Remove an item by key
lsc.remove("username");
```

## Clearing All Data

```ts
// Clear all items from storage
lsc.clear();
```

## Flushing Data

```ts
// Flush expired items (or force flush all with true)
lsc.flush();
lsc.flush(true);
```

# API Reference

| Method/Function      | Signature                                                                          | Description                                                                                                | Parameters                                                       | Return Type                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **set<T>**           | `set<T>(key: string, value: T, localConfig?: Omit<StorageConfig, 'storage'>): void | boolean`                                                                                                   | Stores a value in storage under the specified key.               | **key**: string<br>**value**: T<br>**localConfig** (optional): Configuration object (excluding `storage`)            | `void` if successful, `false` if error occurs  |
| **get<T>**           | `get<T>(key: string, localConfig?: Omit<StorageConfig, 'storage'>): T              | null`                                                                                                      | Retrieves the value associated with the specified key.           | **key**: string<br>**localConfig** (optional): Configuration object (excluding `storage`)                            | Returns the stored value of type `T` or `null` |
| **remove**           | `remove(key: string): void`                                                        | Removes the item associated with the specified key from storage.                                           | **key**: string                                                  | `void`                                                                                                               |
| **clear**            | `clear(): void`                                                                    | Clears all items from storage.                                                                             | _None_                                                           | `void`                                                                                                               |
| **flush**            | `flush(force?: boolean): void`                                                     | Clears expired items from storage. If `force` is `true`, clears all items regardless of expiration.        | **force** (optional): `boolean` (defaults to `false`)            | `void`                                                                                                               |
| **localMemoryStore** | `localMemoryStore(): Storage`                                                      | Creates an in-memory storage object that implements the `Storage` interface. Used as a fallback mechanism. | _None_                                                           | `Storage`                                                                                                            |
| **StorageConfig**    | `{ storage?: Storage; ttl?: number                                                 | null }`                                                                                                    | Interface defining configuration options for storage operations. | **storage** (optional): Storage mechanism (e.g., `localStorage`)<br>**ttl** (optional): Time-to-live in milliseconds | _Interface_ (no return value)                  |
| **KeyValuePair**     | `type KeyValuePair<T = unknown> = Record<string, T>;`                              | Type representing an object with string keys and values of type `T`.                                       | _None_                                                           | _Type definition_                                                                                                    |

# Development

To set up the development environment:

1. **Clone the repository:**
   ```bash
    git clone https://github.com/devlopersabbir/lsc-storage.git
    cd lsc-storage
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Run tests:**
   ```bash
   npm test
   ```
5. **Build the project:**
   ```bash
   npm run build
   ```

# Contributing

Contributions are welcome! 🎉
Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

For detailed contribution guidelines, refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

# License

This project is licensed under the [MIT License](./LICENSE)

## Author

- **Name**: Sabbir Hossain Shuvo
- **Email**: [devlopersabbir@gmail.com](mailto:devloeprsabbir@gmail.com)
- **GitHub**: [@devlopersabbir](https://github.com/devlopersabbir)
- **Buy Me a Coffee**: [@devlopersabbir](https://buymeacoffee.com/devlopersabbir)

# Future Enhancements

- **🔮 Session Storage:** Coming soon!
- **🍪 Cookie Storage:** On the roadmap!
