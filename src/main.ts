import type {
  IStrategy,
  IStrategyEvent,
  IStrategyOptions,
} from "@sovgut/state";

import {
  CookieState,
  LocalState,
  MemoryState,
  SessionState,
} from "@sovgut/state";
import { useCallback, useEffect, useState } from "react";

export function useStorage<Fallback = unknown>(
  strategy: IStrategy,
  key: string,
  options?: IStrategyOptions<Fallback>
): [Fallback | undefined, (value: unknown) => void] {
  const [value, setValue] = useState<Fallback | undefined>(options?.fallback);

  const handleOnChangeEvent = useCallback((event: IStrategyEvent<Fallback>) => {
    setValue(event.value);
  }, []);

  const handleSetValue = useCallback(
    (value: unknown) => {
      switch (strategy) {
        case "cookie": {
          CookieState.set(key, value);
          break;
        }
        case "local": {
          LocalState.set(key, value);
          break;
        }
        case "memory": {
          MemoryState.set(key, value);
          break;
        }
        case "session": {
          SessionState.set(key, value);
          break;
        }
      }
    },
    [strategy, key]
  );

  useEffect(() => {
    switch (strategy) {
      case "cookie": {
        setValue(CookieState.get(key, options))
        CookieState.on(key, handleOnChangeEvent);
        break;
      }
      case "local": {
        setValue(LocalState.get(key, options))
        LocalState.on(key, handleOnChangeEvent);
        break;
      }
      case "memory": {
        setValue(MemoryState.get(key, options))
        MemoryState.on(key, handleOnChangeEvent);
        break;
      }
      case "session": {
        setValue(SessionState.get(key, options))
        SessionState.on(key, handleOnChangeEvent);
        break;
      }
    }

    return function cleanup() {
      switch (strategy) {
        case "cookie": {
          CookieState.off(key, handleOnChangeEvent);
          break;
        }
        case "local": {
          LocalState.off(key, handleOnChangeEvent);
          break;
        }
        case "memory": {
          MemoryState.off(key, handleOnChangeEvent);
          break;
        }
        case "session": {
          SessionState.off(key, handleOnChangeEvent);
          break;
        }
      }
    };
  }, [strategy, key, options, handleOnChangeEvent]);

  return [value, handleSetValue];
}