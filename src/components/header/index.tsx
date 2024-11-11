import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';
import IconFile from 'assets/file.svg?react';
import IconFolder from 'assets/folder.svg?react';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button>
          <IconFolder />
        </button>
        <button>
          <IconFile />
        </button>
        <button>
          <IconEdit />
        </button>
        <button>
          <IconDelete />
        </button>
      </div>
    </div>
  );
};

export default Header;
