import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { filterData } from 'helpers/filterData';

import useLocalStorage from 'hooks/useLocalStorage';

import styles from './styles.module.scss';

const Breadсrumbs = () => {
  const [storedData] = useLocalStorage('data', [], { syncData: true });

  const [searchParams] = useSearchParams();

  const currentId = useMemo(() => searchParams.get('id'), [searchParams]);
  const currentItem = useMemo(() => filterData(storedData, currentId), [storedData, currentId]);

  return (
    <div className={styles.wrapper}>
      <Link to={'/'}>Корень /</Link>
      {currentItem?.parents.map((i) => <span key={i.id + name}> {i.name} / </span>)}
    </div>
  );
};

export default Breadсrumbs;
