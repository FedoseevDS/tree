import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import useLocalStorage from 'hooks/useLocalStorage';

import { filterData } from './helpers';

import styles from './styles.module.scss';

const BreadCrumbs = () => {
  const [storedData] = useLocalStorage('data', [], { syncData: true });
  const [searchParams] = useSearchParams();
  const currentId = searchParams.get('id');

  const currentItem = useMemo(() => filterData(storedData, currentId), [storedData, currentId]);

  return (
    <div className={styles.wrapper}>
      <Link to={'/'}>Корень /</Link>
      {currentItem?.parents.map((i) => <span key={i.id + name}> {i.name} / </span>)}
    </div>
  );
};

export default BreadCrumbs;
