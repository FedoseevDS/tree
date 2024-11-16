import { forwardRef } from 'react';

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
  ({ currentId, data, itemId, stateButton }: TreeInputType, ref) => {
    const shouldRenderInput =
      (data.length !== 0 && !currentId && stateButton?.folder) ||
      (!data.length && !currentId && stateButton?.folder) ||
      (currentId === itemId && stateButton?.folder);

    return shouldRenderInput ? (
      <div className={styles.wrapper}>
        <IconFolder />
        <input
          autoFocus
          ref={ref}
        />
      </div>
    ) : null;
  },
);

export default Input;
