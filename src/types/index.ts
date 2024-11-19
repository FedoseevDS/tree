export type ButtonType = {
  delete: boolean;
  edit: boolean;
  file: boolean;
  folder: boolean;
};

export type Node = {
  children?: Array<Node>;
  id: string;
  name: string;
  type: string;
};
