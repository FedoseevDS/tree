import cn from 'classnames';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import { Node } from '../treeV2/const';

import styles from './styles.module.scss';

export const treeRender = (
  data: Array<Node>,
  expandedFolders: Map<string, boolean>,
  toggleFolder: (id: string) => void,
) => {
  return data.map(({ children, id, name, type }) => {
    const isExpanded = expandedFolders?.get(id) || false;

    switch (type) {
      case 'folder':
        return (
          <div
            className={styles.folder}
            key={id}
          >
            <button onClick={() => toggleFolder(id)}>
              <IconChevron className={cn(isExpanded ? styles.chevronActive : styles.chevron)} />
              <IconFolder />
              <span>{name}</span>
            </button>
            {isExpanded && children && (
              <div className={cn(styles.childrenFolder, { [styles.expanded]: isExpanded })}>
                {treeRender(children, expandedFolders, toggleFolder)}
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
};
