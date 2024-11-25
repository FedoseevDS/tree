import { Node } from 'types';

export const filterData = (storedData: Array<Node>, currentId: null | string): Node | undefined => {
  const findItemFromData = (data: Array<Node>, parents: Array<Node> = []): Node | undefined => {
    for (const item of data) {
      if (item.id === currentId) {
        return {
          ...item,
          children: item.children || [],
          parents: [...parents, item],
        };
      }
      if (item.children) {
        const findItem = findItemFromData(item.children, [...parents, item]);
        if (findItem) {
          return findItem;
        }
      }
    }
    return undefined;
  };

  const findItem = findItemFromData(storedData);
  return findItem;
};
