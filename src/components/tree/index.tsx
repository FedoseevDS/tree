import { Render } from 'components/tree/render';
import { uniqueId } from 'lodash';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CreateFolderContext from 'contexts/createFolderContext';

import { handleTree } from 'helpers/handleTree';

import { useLocalStorage } from 'hooks/useLocalStorage';

import styles from './styles.module.scss';

const Tree = () => {
  const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());
  const [currentId, setCurrentId] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const [stateButton, setStateButton] = useContext(CreateFolderContext);

  const [data, setData] = useLocalStorage({ defaultValue: [], key: 'data' });

  const inputRef = useRef(null);

  const handleMouseDown = useCallback(
    (event) => {
      if (inputRef?.current?.value && !inputRef.current.contains(event.target)) {
        setData((e) => {
          return handleTree([...e], inputRef?.current?.value, searchParams.get('id'), uniqueId);
        });
        setStateButton((e) => ({ ...e, folder: false }));
      }
    },
    [searchParams, setData, setStateButton],
  );

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

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    setCurrentId(searchParams.get('id'));
  }, [searchParams]);

  return (
    <div className={styles.wrapper}>
      {Render(data, expandedFolders, stateButton, inputRef, currentId, toggleFolder)}
    </div>
  );
};

export default Tree;
