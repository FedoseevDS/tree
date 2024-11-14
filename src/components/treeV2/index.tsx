import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { treeRender } from 'components/treeRender';

import { data } from './const';

import styles from './styles.module.scss';

const TreeV2 = () => {
  const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());

  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.forEach((i) => console.log(i));

  const toggleFolder = (id: string) => {
    setExpandedFolders((prevExpandedFolders) => {
      const newExpandedFolders = new Map(prevExpandedFolders);
      newExpandedFolders.set(id, !newExpandedFolders.get(id));
      return newExpandedFolders;
    });

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('id', id);
      return newParams;
    });
  };

  return <div className={styles.wrapper}>{treeRender(data, expandedFolders, toggleFolder)}</div>;
};

export default TreeV2;
