import { cleanup, renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useStorage } from "./main";
import {
  CookieState,
  LocalState,
  MemoryState,
  SessionState,
} from "@sovgut/state";

describe("useStorage", () => {
  const key = "test-key";

  beforeEach(() => {
    cleanup();

    LocalState.clear();
    SessionState.clear();
    MemoryState.clear();
    CookieState.clear();

    LocalState.removeAllListeners();
    SessionState.removeAllListeners();
    MemoryState.removeAllListeners();
    CookieState.removeAllListeners();
  });

  describe("local strategy", () => {
    it("should use storage", () => {
      const { result } = renderHook(() => useStorage("local", key));

      expect(result.current[0]).toBe(undefined);

      act(() => {
        result.current[1]("new-value");
      });

      expect(result.current[0]).toBe("new-value");
      expect(LocalState.get(key)).toBe("new-value");
    });

    it("should use options.fallback", () => {
      const { result } = renderHook(() =>
        useStorage("local", key, { fallback: 1n })
      );

      expect(result.current[0]).toBe(1n);

      act(() => {
        result.current[1](2n);
      });

      expect(result.current[0]).toBe(2n);
      expect(LocalState.get(key)).toBe("2");
    });

    it("should use options.cast", () => {
        const { result } = renderHook(() =>
          useStorage("local", key, { cast: "bigint" })
        );
  
        expect(result.current[0]).toBe(undefined);
  
        act(() => {
          result.current[1](1n);
        });
  
        expect(result.current[0]).toBe(1n);
        expect(LocalState.get(key)).toBe("1");
      });
  });

  describe("cookie strategy", () => {
    it("should use storage", () => {
      const { result } = renderHook(() => useStorage("cookie", key));

      expect(result.current[0]).toBe(undefined);

      act(() => {
        result.current[1]("new-value");
      });

      expect(result.current[0]).toBe("new-value");
      expect(CookieState.get(key)).toBe("new-value");
    });

    it("should use options.fallback", () => {
      const { result } = renderHook(() =>
        useStorage("cookie", key, { fallback: 1n })
      );

      expect(result.current[0]).toBe(1n);

      act(() => {
        result.current[1](2n);
      });

      expect(result.current[0]).toBe(2n);
      expect(CookieState.get(key)).toBe("2");
    });

    it("should use options.cast", () => {
        const { result } = renderHook(() =>
          useStorage("cookie", key, { cast: "bigint" })
        );
  
        expect(result.current[0]).toBe(undefined);
  
        act(() => {
          result.current[1](1n);
        });
  
        expect(result.current[0]).toBe(1n);
        expect(CookieState.get(key)).toBe("1");
      });
  });

  describe("memory strategy", () => {
    it("should use storage", () => {
      const { result } = renderHook(() => useStorage("memory", key));

      expect(result.current[0]).toBe(undefined);

      act(() => {
        result.current[1]("new-value");
      });

      expect(result.current[0]).toBe("new-value");
      expect(MemoryState.get(key)).toBe("new-value");
    });

    it("should use options.fallback", () => {
      const { result } = renderHook(() =>
        useStorage("memory", key, { fallback: 1n })
      );

      expect(result.current[0]).toBe(1n);

      act(() => {
        result.current[1](2n);
      });

      expect(result.current[0]).toBe(2n);
      expect(MemoryState.get(key)).toBe("2");
    });

    it("should use options.cast", () => {
        const { result } = renderHook(() =>
          useStorage("memory", key, { cast: "bigint" })
        );
  
        expect(result.current[0]).toBe(undefined);
  
        act(() => {
          result.current[1](1n);
        });
  
        expect(result.current[0]).toBe(1n);
        expect(MemoryState.get(key)).toBe("1");
      });
  });

  describe("session strategy", () => {
    it("should use storage", () => {
      const { result } = renderHook(() => useStorage("session", key));

      expect(result.current[0]).toBe(undefined);

      act(() => {
        result.current[1]("new-value");
      });

      expect(result.current[0]).toBe("new-value");
      expect(SessionState.get(key)).toBe("new-value");
    });

    it("should use options.fallback", () => {
      const { result } = renderHook(() =>
        useStorage("session", key, { fallback: 1n })
      );

      expect(result.current[0]).toBe(1n);

      act(() => {
        result.current[1](2n);
      });

      expect(result.current[0]).toBe(2n);
      expect(SessionState.get(key)).toBe("2");
    });

    it("should use options.cast", () => {
        const { result } = renderHook(() =>
          useStorage("session", key, { cast: "bigint" })
        );
  
        expect(result.current[0]).toBe(undefined);
  
        act(() => {
          result.current[1](1n);
        });
  
        expect(result.current[0]).toBe(1n);
        expect(SessionState.get(key)).toBe("1");
      });
  });
});
