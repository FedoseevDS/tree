import { Dispatch, SetStateAction } from 'react';
import { ButtonType } from 'types';

export const handleButton =
  (type: keyof ButtonType, onClick: Dispatch<SetStateAction<ButtonType>> | null) => () =>
    onClick && onClick((prev) => ({ ...prev, [type]: true }));

export const handleTypeName = (stateButton: ButtonType) =>
  Object.entries(stateButton).reduce((prevV, curV) => {
    if (curV.includes(true)) {
      return curV[0];
    }
    return prevV;
  }, '');
