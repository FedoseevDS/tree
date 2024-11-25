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
  const [expandedItems, setExpandedItems] = useState<Map<string, boolean>>(new Map());

  const [searchParams, setSearchParams] = useSearchParams();

  const [stateButton, setStateButton] = useContext(BooleanButtonsContext);

  const [data, setData] = useLocalStorage<Array<Node>>('data', []);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentId = useMemo(() => searchParams.get('id') || '', [searchParams]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (inputRef?.current?.value && !inputRef.current.contains(event.target as HTMLDataElement)) {
        setData((prevData: Array<Node> | undefined) => {
          const result = handleTree(
            prevData ? [...prevData] : [],
            inputRef?.current?.value || '',
            searchParams.get('id') || '',
            handleTypeName(stateButton),
            nanoid,
          );
          return result as Array<Node> | undefined;
        });
        if (setStateButton) {
          setStateButton((e) => ({ ...e, edit: false, file: false, folder: false }));
        }
      }
    },
    [searchParams, stateButton, setData, setStateButton],
  );

  const toggleItem = useCallback(
    (id: string) => {
      setExpandedItems((prevExpandedItems) => {
        const newExpandedItems = new Map(prevExpandedItems);
        newExpandedItems.set(id, !newExpandedItems.get(id));
        return newExpandedItems;
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
    setData((prevData: Array<Node> | undefined) => {
      if (prevData && prevData.length > 0 && stateButton.delete) {
        setExpandedItems((prevItem) => {
          prevItem.delete(currentId);
          return prevItem;
        });
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete('id');
          return newParams;
        });
        return handleDeleteItem(prevData, currentId || '', setStateButton);
      }
      return prevData || [];
    });
  }, [currentId, stateButton, setData, setStateButton, setSearchParams]);

  // TODO: Render - сделать функциональную компоненту
  return (
    <div className={styles.wrapper}>
      {Render(data, expandedItems, stateButton, inputRef, currentId, toggleItem)}
    </div>
  );
};

export default Tree;
