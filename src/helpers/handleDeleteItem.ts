import { Dispatch, SetStateAction } from 'react';
import { ButtonType, Node } from 'types';

type HandleDeleteItemTypes = {
  data: Node[];
  itemId: string;
  setStateButton?: Dispatch<SetStateAction<ButtonType>> | null;
};

export const handleDeleteItem: (
  data: Node[] | undefined,
  itemId: string,
  setStateButton: HandleDeleteItemTypes['setStateButton'],
) => Node[] = (data, itemId, setStateButton) => {
  const safeData = data || [];

  return safeData.reduce((prevV: Node[], curV: Node) => {
    const isItem = curV.id === itemId;
    if (isItem) {
      setStateButton?.({ delete: false, edit: false, file: false, folder: false });
      return [...prevV];
    }
    if (curV.type === 'folder') {
      return [
        ...prevV,
        {
          ...curV,
          children: handleDeleteItem(curV.children, itemId, setStateButton),
        },
      ];
    }
    return [...prevV, curV];
  }, []);
};
