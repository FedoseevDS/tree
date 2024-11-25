import { createContext, Dispatch, SetStateAction } from 'react';
import { ButtonType } from 'types';

type BooleanButtonsContextType = [ButtonType, Dispatch<SetStateAction<ButtonType>> | null];

const initialState: ButtonType = { delete: false, edit: false, file: false, folder: false };
const BooleanButtonsContext = createContext<BooleanButtonsContextType>([initialState, null]);

export { initialState };
export default BooleanButtonsContext;
