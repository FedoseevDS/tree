import Header from 'components/header';
// import Tree from 'components/tree';
import TreeV2 from 'components/treeV2';

import styles from './styles.module.scss';

const Main = () => (
  <div>
    <Header />
    <div className={styles.body}>
      {/* <Tree /> */}
      <TreeV2 />
      <div className={styles.content}>Черный квадрат малевича</div>
    </div>
  </div>
);

export default Main;
