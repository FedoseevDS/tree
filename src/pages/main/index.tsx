import Header from 'components/header';
import Tree from 'components/tree';

import styles from './styles.module.scss';

const Main = () => (
  <div>
    <Header />
    <div className={styles.content}>
      <Tree />
      <div
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        Черный квадрат малевича
      </div>
    </div>
  </div>
);

export default Main;
