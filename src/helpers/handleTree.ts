import { Node } from 'types';

export const handleTree = (
  data: Array<Node>,
  name: string,
  paramsId: string,
  type: string,
  uniqueId: () => string,
): Array<Node> => {
  if (paramsId === '') {
    return [
      ...data,
      {
        children: [],
        id: uniqueId(),
        name,
        type,
      },
    ];
  }

  return data.map((item) => {
    if (item.id === paramsId) {
      if (type === 'folder' || type === 'file') {
        return {
          ...item,
          children: [
            ...(item.children || []),
            {
              children: [],
              id: uniqueId(),
              name,
              type,
            },
          ],
        };
      }
      if (type === 'edit') {
        const typeField = item.type;

        return {
          children: [...(item.children || [])],
          id: paramsId,
          name,
          type: typeField,
        };
      }
    }

    return {
      ...item,
      children: handleTree(item.children || [], name, paramsId, type, uniqueId),
    };
  });
};
