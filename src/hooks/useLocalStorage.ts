import { useEffect, useMemo, useRef, useState } from 'react';

type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (val: string) => T | undefined;
type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

type Options<T> = Partial<{
  parser: Parser<T>;
  serializer: Serializer<T>;
  syncData: boolean;
}>;

function useLocalStorage<T>(key: string, defaultValue: T, options?: Options<T>): [T, Setter<T>];
function useLocalStorage<T>(key: string, defaultValue?: T, options?: Options<T>) {
  const opts = useMemo(() => {
    return {
      parser: JSON.parse,
      serializer: JSON.stringify,
      syncData: true,
      ...options,
    };
  }, [options]);

  const { parser, serializer, syncData } = opts;

  const rawValueRef = useRef<null | string>(null);

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    rawValueRef.current = window.localStorage.getItem(key);
    const res: T = rawValueRef.current ? parser(rawValueRef.current) : defaultValue;
    return res;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateLocalStorage = () => {
      if (value !== undefined) {
        const newValue = serializer(value);
        const oldValue = rawValueRef.current;
        rawValueRef.current = newValue;
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue,
            oldValue,
            storageArea: window.localStorage,
            url: window.location.href,
          }),
        );
      } else {
        window.localStorage.removeItem(key);
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            storageArea: window.localStorage,
            url: window.location.href,
          }),
        );
      }
    };

    updateLocalStorage();
  }, [value]);

  useEffect(() => {
    if (!syncData) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) return;

      if (e.newValue !== rawValueRef.current) {
        rawValueRef.current = e.newValue;
        setValue(e.newValue ? parser(e.newValue) : undefined);
      }
    };

    if (typeof window === 'undefined') return;

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, syncData]);

  return [value, setValue];
}

export default useLocalStorage;
