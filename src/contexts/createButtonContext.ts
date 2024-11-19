import { createContext } from 'react';
import { ButtonType } from 'types';

type CreateButtonContextType = [
  ButtonType,
  null | React.Dispatch<React.SetStateAction<ButtonType>>,
];

const initialState: ButtonType = { delete: false, edit: false, file: false, folder: false };
const CreateButtonContext = createContext<CreateButtonContextType>([initialState, null]);

export { initialState };
export default CreateButtonContext;
