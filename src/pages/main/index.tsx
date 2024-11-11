import Header from 'components/header';

import styles from './styles.module.scss';

const Main = () => (
  <div>
    <Header />
    <div className={styles.content}>
      <div className={styles.tree}>
        <div>Дерево</div>
      </div>
      <div />
    </div>
  </div>
);

export default Main;
