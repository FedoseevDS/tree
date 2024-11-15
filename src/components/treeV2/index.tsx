import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { treeRender } from 'components/treeRender';

import CreateFolderContext from 'contexts/createFolderContext';

import { data } from './const';

import styles from './styles.module.scss';

const TreeV2 = () => {
  const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());

  const [searchParams, setSearchParams] = useSearchParams();

  const [stateButton] = useContext(CreateFolderContext);

  console.log('stateButton', stateButton);

  const onChange = useCallback(({ target }: { target: { value: string } }) => {
    console.log('event', target.value);
  }, []);

  const toggleFolder = useCallback(
    (id: string) => {
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
    },
    [setSearchParams],
  );

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('id');
      return newParams;
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      {treeRender(data, expandedFolders, searchParams, stateButton, onChange, toggleFolder)}
    </div>
  );
};

export default TreeV2;
