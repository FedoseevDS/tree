import { useState } from 'react';

import cn from 'classnames';

import IconChevron from 'assets/chevron.svg?react';
import IconFolder from 'assets/folder.svg?react';

import { Node, data } from './const';
import styles from './styles.module.scss';

const renderTree = (
  data: Array<Node>,
  expandedFolders: Map<string, boolean>,
  toggleFolder: (id: string) => void,
) => {
  return data.map(({ type, id, name, children }) => {
    const isExpanded = expandedFolders?.get(id) || false;

    switch (type) {
      case 'folder':
        return (
          <div key={id}>
            <button onClick={() => toggleFolder(id)}>
              <IconChevron className={cn(isExpanded ? styles.chevronActive : styles.chevron)} />
              <IconFolder />
              <span>{name}</span>
            </button>
            {isExpanded && children && (
              <div className={cn(styles.childrenFolder, { [styles.expanded]: isExpanded })}>
                {renderTree(children, expandedFolders, toggleFolder)}
              </div>
            )}
          </div>
        );
      default:
        return (
          <button
            className={styles.file}
            key={id}
          >
            <span>{name}</span>
          </button>
        );
    }
  });
};

const Tree = () => {
  const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());

  const toggleFolder = (id: string) => {
    setExpandedFolders((prevExpandedFolders) => {
      const newExpandedFolders = new Map(prevExpandedFolders);
      newExpandedFolders.set(id, !newExpandedFolders.get(id));
      return newExpandedFolders;
    });
  };

  return <div className={styles.wrapper}>{renderTree(data, expandedFolders, toggleFolder)}</div>;
};

export default Tree;
