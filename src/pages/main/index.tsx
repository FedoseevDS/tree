import Header from 'components/header';
import Tree from 'components/tree';
import WebSocket from 'components/webSocket';

import styles from './styles.module.scss';

const Main = () => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.body}>
      <Tree />
      <div />
    </div>
    <WebSocket />
  </div>
);

export default Main;
