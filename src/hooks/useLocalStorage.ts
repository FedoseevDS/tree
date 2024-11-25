import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

// Т - обобщенный тип
type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (val: string) => T | undefined;
type Setter<T> = Dispatch<SetStateAction<T | undefined>>;

// Partial - делает все свойства в объекте не обязательными
type Options<T> = Partial<{
  parser: Parser<T>;
  serializer: Serializer<T>;
  syncData: boolean;
}>;

// Используется перегрузка функций с двумя разными сигнатурами
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
    // задаю значение по умолчанию
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    // получаю данные из localStorage по ключу
    rawValueRef.current = window.localStorage.getItem(key);

    // получаю данные или значение по умолчанию
    const res: T = rawValueRef.current ? parser(rawValueRef.current) : defaultValue;
    return res;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // функция для обновления localStorage
    const updateLocalStorage = () => {
      if (value !== undefined) {
        // перевожу данные в JSON формат
        const newValue = serializer(value);
        // переменная для хранения старых данных
        const oldValue = rawValueRef.current;
        // перезаписал данные в ref, не понял только зачем ???
        rawValueRef.current = newValue;
        // записал новые данные в localStorage
        window.localStorage.setItem(key, newValue);
        // dispatchEvent - вызывает повторно событие storage
        // new StorageEvent - создаю новый StorageEvent объект и передаю новые данные
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // используется для синхронизации данных на одной вкладки
  useEffect(() => {
    if (!syncData) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== window.localStorage) {
        return;
      }

      if (e.newValue !== rawValueRef.current) {
        rawValueRef.current = e.newValue;
        setValue(e.newValue ? parser(e.newValue) : undefined);
      }
    };

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, syncData]);

  return [value, setValue];
}

export default useLocalStorage;
