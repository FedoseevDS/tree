import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

export const config = [
  { img: <IconCreateFolder />, type: 'folder' as const },
  { img: <IconCreateFile />, type: 'file' as const },
  { img: <IconEdit />, type: 'edit' as const },
  { img: <IconDelete />, type: 'delete' as const },
];
