import cn from 'classnames';
import { RefObject } from 'react';
import { ButtonType, Node } from 'types';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import Input from '../input';

import styles from './styles.module.scss';

export const Render = (
  data: Array<Node>,
  expandedFolders: Map<string, boolean>,
  stateButton: ButtonType | null,
  inputRef: RefObject<HTMLInputElement>,
  currentId: string,
  toggleFolder: (id: string) => void,
) => {
  const filterData = data?.map(({ children, id, name, type }) => {
    const isExpanded = expandedFolders?.get(id) || false;

    switch (type) {
      case 'folder':
        return (
          <div
            className={styles.folder}
            key={id}
          >
            {stateButton?.edit && id === currentId ? (
              <input
                autoFocus
                ref={inputRef}
              />
            ) : (
              <button
                className={cn({ [styles.itemActive]: id === currentId })}
                onClick={() => toggleFolder(id)}
              >
                <IconChevron className={cn(isExpanded ? styles.chevronActive : styles.chevron)} />
                <IconFolder />
                <span>{name}</span>
              </button>
            )}
            <Input
              currentId={currentId}
              data={data}
              itemId={id}
              ref={inputRef}
              stateButton={stateButton}
            />
            {isExpanded && children && (
              <div className={cn(styles.childrenFolder, { [styles.expanded]: isExpanded })}>
                {Render(children, expandedFolders, stateButton, inputRef, currentId, toggleFolder)}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div key={id}>
            {stateButton?.edit && id === currentId ? (
              <input
                autoFocus
                ref={inputRef}
              />
            ) : (
              <button
                className={cn(styles.file, { [styles.itemActive]: id === currentId })}
                onClick={() => toggleFolder(id)}
              >
                <span>{name}</span>
              </button>
            )}
          </div>
        );
    }
  });

  return (
    <div className={styles.container}>
      <Input
        currentId={currentId}
        data={data}
        itemId={''}
        ref={inputRef}
        stateButton={stateButton}
      />
      {filterData}
    </div>
  );
};
