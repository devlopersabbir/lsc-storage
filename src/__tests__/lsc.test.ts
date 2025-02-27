import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { lsc } from "../../libs";

// Mock localStorage
const mockStorage: Storage = {
  store: new Map<string, string>(),
  getItem(key: string) {
    return this.store.get(key) || null;
  },
  setItem(key: string, value: string) {
    this.store.set(key, value);
  },
  removeItem(key: string) {
    this.store.delete(key);
  },
  clear() {
    this.store.clear();
  },
  length: 0,
  key(index: number) {
    return Array.from(this.store.keys())[index] || null;
  },
} as unknown as Storage;

beforeEach(() => {
  mockStorage.store.clear();
});

describe("Lsc Storage", () => {
  it("should store and retrieve an item", () => {
    const key = "testKey";
    const value = "testValue";
    Lsc.set(key, value);
    expect(Lsc.get(key)).toBe(value);
  });

  it("should remove an item", () => {
    const key = "testKey";
    Lsc.set(key, "value");
    Lsc.remove(key);
    expect(Lsc.get(key)).toBeNull();
  });

  it("should clear all items", () => {
    Lsc.set("key1", "value1");
    Lsc.set("key2", "value2");
    Lsc.clear();
    expect(Lsc.get("key1")).toBeNull();
    expect(Lsc.get("key2")).toBeNull();
  });

  it("should expire items after the given time", async () => {
    const key = "expiringKey";
    Lsc.set(key, "value", { expireAt: "1m" });
    vi.useFakeTimers();
    vi.advanceTimersByTime(60 * 1000 + 1);
    expect(Lsc.get(key)).toBeNull();
    vi.useRealTimers();
  });

  it("should not expire items before time runs out", async () => {
    const key = "validKey";
    Lsc.set(key, "value", { expireAt: "2m" });
    vi.useFakeTimers();
    vi.advanceTimersByTime(60 * 1000);
    expect(Lsc.get(key)).toBe("value");
    vi.useRealTimers();
  });
});
