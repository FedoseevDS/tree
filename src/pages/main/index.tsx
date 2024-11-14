import Header from 'components/header';
import Tree from 'components/tree';

import styles from './styles.module.scss';

const Main = () => (
  <div>
    <Header />
    <div className={styles.body}>
      <Tree />
      <div className={styles.content}>Черный квадрат малевича</div>
    </div>
  </div>
);

export default Main;
