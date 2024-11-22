import { Node } from 'types';

export const filterData = (data: Array<Node>, currentId: null | string): Node | undefined => {
  const findNodeWithParents = (nodes: Array<Node>, parents: Array<Node> = []): Node | undefined => {
    for (const node of nodes) {
      if (node.id === currentId) {
        const parentNodes = [...parents, node];
        return {
          ...node,
          children: node.children || [],
          parents: parentNodes,
        };
      }
      if (node.children) {
        const foundNode = findNodeWithParents(node.children, [...parents, node]);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return undefined;
  };

  const foundNode = findNodeWithParents(data);
  return foundNode;
};
