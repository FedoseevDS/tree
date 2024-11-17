import { createContext } from 'react';
import { HeaderTypes } from 'types';

const initialState = { delete: false, edit: false, file: false, folder: false };
const CreateFolderContext = createContext<
  [HeaderTypes, null | React.Dispatch<React.SetStateAction<HeaderTypes>>]
>([initialState, null]);

export { initialState };
export default CreateFolderContext;
