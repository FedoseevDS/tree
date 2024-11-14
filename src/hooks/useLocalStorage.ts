import { useEffect, useState } from 'react';

type LocalStorageType = {
  defaultValue?: [] | { delete: boolean; edit: boolean; file: boolean; folder: boolean };
  key: string;
};

export const useLocalStorage = ({ defaultValue, key }: LocalStorageType) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getitem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
  }, [value, key]);

  return [value, setValue];
};
