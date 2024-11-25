import { nanoid } from 'nanoid';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Node } from 'types';

import BooleanButtonsContext from 'contexts/booleanButtonsContext';

import { handleTypeName } from 'helpers/handleButton';
import { handleDeleteItem } from 'helpers/handleDeleteItem';
import { handleTree } from 'helpers/handleTree';

import useLocalStorage from 'hooks/useLocalStorage';

import { Render } from './render';

import styles from './styles.module.scss';

const Tree = () => {
  const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());

  const [searchParams, setSearchParams] = useSearchParams();

  const [stateButton, setStateButton] = useContext(BooleanButtonsContext);

  const [data, setData] = useLocalStorage('data', []);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentId = useMemo(() => searchParams.get('id') || '', [searchParams]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (inputRef?.current?.value && !inputRef.current.contains(event.target as HTMLDataElement)) {
        setData((e) => {
          const result = handleTree(
            [...e],
            inputRef?.current?.value || '',
            searchParams.get('id') || '',
            handleTypeName(stateButton),
            nanoid,
          );
          return result;
        });
        if (setStateButton) {
          setStateButton((e) => ({ ...e, edit: false, file: false, folder: false }));
        }
      }
    },
    [searchParams, stateButton, setData, setStateButton],
  );

  // TODO: переименовать название функции
  const toggleFolder = useCallback(
    (id: string) => {
      // TODO: переименовать название функции
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
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    setData((e: Array<Node>) => {
      if (e.length > 0 && stateButton.delete) {
        setExpandedFolders((prevItem) => {
          prevItem.delete(currentId);
          return prevItem;
        });
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete('id');
          return newParams;
        });
        return handleDeleteItem(e, currentId || '', setStateButton);
      }
      return e;
    });
  }, [currentId, stateButton, setData, setStateButton, setSearchParams]);

  // TODO: Render - сделать функциональную компоненту
  return (
    <div className={styles.wrapper}>
      {Render(data, expandedFolders, stateButton, inputRef, currentId, toggleFolder)}
    </div>
  );
};

export default Tree;
