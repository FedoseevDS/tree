import { Node } from 'components/tree/const';

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

    return {
      ...item,
      children: handleTree(item.children || [], name, paramsId, type, uniqueId),
    };
  });
};
