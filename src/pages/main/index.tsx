import Header from 'components/header';
import Tree from 'components/tree';
import WebSocket from 'components/webSocket';

import styles from './styles.module.scss';

const Main = () => (
  <div>
    <Header />
    <div className={styles.body}>
      <Tree />
      <div className={styles.content}>Черный квадрат малевича</div>
    </div>
    <WebSocket />
  </div>
);

export default Main;
