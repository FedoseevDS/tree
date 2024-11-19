import { createContext, Dispatch, SetStateAction } from 'react';
import { ButtonType } from 'types';

type CreateButtonContextType = [ButtonType, Dispatch<SetStateAction<ButtonType>> | null];

const initialState: ButtonType = { delete: false, edit: false, file: false, folder: false };
const CreateButtonContext = createContext<CreateButtonContextType>([initialState, null]);

export { initialState };
export default CreateButtonContext;
