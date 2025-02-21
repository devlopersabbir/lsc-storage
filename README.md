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
import { lscStorage } from "lsc-storage";
type User = {
  name: string;
  age: 25;
};

await lscStorage("user", { name: "John Doe", age: 25 }); // lsc-storage is enough expert to knows the type
await lscStorage<User>("user", { name: "John Doe", age: 25 });
```

**Retrieve Data from Local Storage**
To retrieve stored data, pass only the key:

```ts
import { lscStorage } from "lsc-storage";

const user = await lscStorage("user");
console.log(user); // { name: "John Doe", age: 25 }
```

## Error Handling

If an error occurs (e.g., exceeding the storage quota), it will be logged to the console:

```txt
Storage is full, please clear some space!
```

## API Reference

### `lscStorage(key: string, value: T): Promise<void>`

- **Parameters**:
  - `key`: The key used to store the data.
  - `value`: The value to be stored (optional when retrieving).
- **Returns**: A promise that resolves when the data is stored.

### `lscStorage(key: string): Promise<T | null>`

- **Parameters**:
  - `key`: The key used to retrieve the data.
- **Returns**: The data stored in local storage, or `null` if not found.

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
