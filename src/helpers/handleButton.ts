import { Dispatch, SetStateAction } from 'react';
import { ButtonType } from 'types';

export const handleButton =
  (type: string, onClick: Dispatch<SetStateAction<ButtonType>> | null) => () => {
    switch (type) {
      case 'delete':
        return onClick && onClick((prev) => ({ ...prev, delete: true }));
      case 'file':
        return onClick && onClick((prev) => ({ ...prev, file: true }));
      case 'folder':
        return onClick && onClick((prev) => ({ ...prev, folder: true }));
    }
  };

export const handleTypeName = (stateButton: ButtonType) =>
  Object.entries(stateButton).reduce((prevV, curV) => {
    if (curV.includes(true)) {
      return curV[0];
    }
    return prevV;
  }, '');
