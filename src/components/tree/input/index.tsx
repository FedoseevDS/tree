import { forwardRef } from 'react';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import { Node } from '../const';

import styles from './styles.module.scss';

type TreeInputType = {
  currentId: string;
  data: Array<Node>;
  itemId: string;
  stateButton: { delete: boolean; edit: boolean; file: boolean; folder: boolean } | null;
};

const Input = forwardRef<HTMLInputElement, TreeInputType>(
  ({ currentId, data, itemId, stateButton }, ref) => {
    const currentStateButton = stateButton?.folder || stateButton?.file;

    const shouldRenderInput =
      (data.length !== 0 && !currentId && !itemId && currentStateButton) ||
      (!data.length && !currentId && !itemId && currentStateButton) ||
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
