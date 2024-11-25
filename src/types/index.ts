export type ButtonType = {
  delete: boolean;
  edit: boolean;
  file: boolean;
  folder: boolean;
};

export type Node = {
  children?: Array<Node> | undefined;
  id: string;
  name: string;
  parents?: Array<Node>;
  type: string;
};
