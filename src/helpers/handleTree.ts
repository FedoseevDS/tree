export const handleTree = (data, name, id = null, uniqueId) => {
  if (id === null) {
    return [
      ...data,
      {
        children: [],
        id: uniqueId(),
        name,
        type: 'folder',
      },
    ];
  }

  return data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        children: [
          ...item.children,
          {
            children: [],
            id: uniqueId(),
            name,
            type: 'folder',
          },
        ],
      };
    }

    return {
      ...item,
      children: handleTree(item.children, name, id, uniqueId),
    };
  });
};
