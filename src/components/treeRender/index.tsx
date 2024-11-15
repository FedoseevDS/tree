import cn from 'classnames';
import { ChangeEventHandler } from 'react';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import { Node } from '../treeV2/const';

import styles from './styles.module.scss';

export const treeRender = (
  data: Array<Node>,
  expandedFolders: Map<string, boolean>,
  searchParams: URLSearchParams,
  stateButton: { delete: boolean; edit: boolean; file: boolean; folder: boolean } | null,
  onChange: ChangeEventHandler<HTMLInputElement>,
  toggleFolder: (id: string) => void,
) => {
  const filterData = data.map(({ children, id, name, type }) => {
    const isExpanded = expandedFolders?.get(id) || false;

    switch (type) {
      case 'folder':
        return (
          <div
            className={styles.folder}
            key={id}
          >
            <div>
              <button onClick={() => toggleFolder(id)}>
                <IconChevron className={cn(isExpanded ? styles.chevronActive : styles.chevron)} />
                <IconFolder />
                <span>{name}</span>
              </button>
            </div>
            {searchParams?.get('id') === id && stateButton?.folder && (
              <div>
                <input
                  autoFocus
                  onChange={onChange}
                />
              </div>
            )}
            {isExpanded && children && (
              <div className={cn(styles.childrenFolder, { [styles.expanded]: isExpanded })}>
                {treeRender(
                  children,
                  expandedFolders,
                  searchParams,
                  stateButton,
                  onChange,
                  toggleFolder,
                )}
              </div>
            )}
          </div>
        );
      default:
        return (
          <button
            className={styles.file}
            key={id}
            onClick={() => toggleFolder(id)}
          >
            <span>{name}</span>
          </button>
        );
    }
  });

  return <div className={styles.container}>{filterData}</div>;
};
