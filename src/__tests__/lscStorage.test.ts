import { describe, beforeAll, it, beforeEach, expect, vi } from "vitest";
import { lscStorage } from "../../libs"; // Path to your function

describe("lscStorage", () => {
  beforeAll(() => {
    // Mock localStorage to avoid actually accessing browser localStorage during tests
    globalThis.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
  });

  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should store data in local storage", async () => {
    const mockData = { name: "Sabbir", age: 21 };
    const key = "user";

    // Mock the setItem method of localStorage
    const setItemMock = vi.spyOn(global.localStorage, "setItem");

    const result = await lscStorage(key, mockData);

    expect(setItemMock).toHaveBeenCalledWith(key, JSON.stringify(mockData)); // check if localStorage.setItem is called
    expect(result).toBe(`${key} stored in local storage!`); // check the return value
  });

  it("should retrieve data from local storage", async () => {
    const mockData = { name: "John Doe", age: 25 };
    const key = "user";

    // Mock the getItem method of localStorage
    const getItemMock = vi
      .spyOn(global.localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockData));

    const result = await lscStorage(key);

    expect(getItemMock).toHaveBeenCalledWith(key); // check if localStorage.getItem is called
    expect(result).toEqual(mockData); // check the return value is the parsed data
  });

  it("should return null if no data is found in local storage", async () => {
    const key = "user";

    // Mock the getItem method of localStorage
    const getItemMock = vi
      .spyOn(global.localStorage, "getItem")
      .mockReturnValue(null);

    const result = await lscStorage(key);

    expect(getItemMock).toHaveBeenCalledWith(key); // check if localStorage.getItem is called
    expect(result).toBe("No data found in local storage"); // check the return value
  });

  it("should handle storage errors gracefully", async () => {
    const key = "user";

    // Simulate an error in localStorage.setItem (QuotaExceededError)
    const setItemMock = vi
      .spyOn(global.localStorage, "setItem")
      .mockImplementation(() => {
        throw new DOMException("QuotaExceededError");
      });

    const result = await lscStorage(key, { name: "John Doe", age: 25 });

    expect(setItemMock).toHaveBeenCalledWith(
      key,
      '{"name":"John Doe","age":25}'
    );
    expect(result).toBe("Error accessing local storage");
  });

  it("should handle JSON parsing errors", async () => {
    const key = "user";

    // Simulate invalid JSON data
    const getItemMock = vi
      .spyOn(global.localStorage, "getItem")
      .mockReturnValue("invalid json");

    const result = await lscStorage(key);

    expect(getItemMock).toHaveBeenCalledWith(key);
    expect(result).toBe("Failed to parse the data from local storage");
  });
});
