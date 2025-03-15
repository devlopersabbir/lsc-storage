import { describe, it, expect, beforeEach } from "vitest";
import { lsc } from "../index";

/**
 * Unit tests for LscStorage using Vitest
 */
describe("LscStorage", () => {
  beforeEach(() => {
    lsc.clear();
  });

  it("should store and retrieve a string value", () => {
    lsc.set("testKey", "testValue");
    const result = lsc.get<string>("testKey");
    expect(result).toBe("testValue");
  });

  it("should store and retrieve a number value", () => {
    lsc.set("testNumber", 42);
    const result = lsc.get<number>("testNumber");
    expect(result).toBe(42);
  });

  it("should return null for a non-existing key", () => {
    const result = lsc.get("nonExistentKey");
    expect(result).toBeNull();
  });

  it("should remove a stored item", () => {
    lsc.set("toBeRemoved", "value");
    lsc.remove("toBeRemoved");
    const result = lsc.get("toBeRemoved");
    expect(result).toBeNull();
  });

  it("should clear all stored items", () => {
    lsc.set("key1", "value1");
    lsc.set("key2", "value2");
    lsc.clear();
    expect(lsc.get("key1")).toBeNull();
    expect(lsc.get("key2")).toBeNull();
  });

  it("should fallback to in-memory storage if localStorage is unavailable", () => {
    global.localStorage = undefined as any;
    const memoryStorage = lsc.get("memoryTest");
    expect(memoryStorage).toBeNull();
  });
});
