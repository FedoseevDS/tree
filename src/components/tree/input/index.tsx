import { forwardRef } from 'react';
import { ButtonType, Node } from 'types';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import styles from './styles.module.scss';

type TreeInputType = {
  currentId: string;
  data: Array<Node>;
  itemId: string;
  stateButton: ButtonType | null;
};

const Input = forwardRef<HTMLInputElement, TreeInputType>(
  ({ currentId, data, itemId, stateButton }, ref) => {
    const currentStateButton = stateButton?.folder || stateButton?.file;

    const shouldRenderInput =
      (data?.length !== 0 && !currentId && !itemId && currentStateButton) ||
      (!data?.length && !currentId && !itemId && currentStateButton) ||
      (currentId === itemId && currentStateButton);

    return shouldRenderInput ? (
      <div className={styles.wrapper}>
        {stateButton?.folder && <IconChevron />}
        {stateButton?.folder && <IconFolder />}
        <input
          autoFocus
          ref={ref}
        />
      </div>
    ) : null;
  },
);

export default Input;
