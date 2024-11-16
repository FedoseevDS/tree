import { createContext } from 'react';
import { HeaderTypes } from 'types';

const initialState: HeaderTypes = { delete: false, edit: false, file: false, folder: false };
const CreateFolderContext = createContext([initialState, null]);

export { initialState };
export default CreateFolderContext;
