import deleteImg from 'assets/delete.svg';
import editImg from 'assets/edit.svg';
import fileImg from 'assets/file.svg';
import iconFolder from 'assets/folder.svg';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button>
          <img src={iconFolder} alt="добавить папку" />
        </button>
        <button>
          <img src={fileImg} alt="добавить файл" />
        </button>
        <button>
          <img src={editImg} alt="редактировать" />
        </button>
        <button>
          <img src={deleteImg} alt="удалить" />
        </button>
      </div>
    </div>
  );
};

export default Header;
