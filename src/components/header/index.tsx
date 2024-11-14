import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import { useLocalStorage } from 'hooks/useLocalStorage';

import styles from './styles.module.scss';

export type HeaderTypes = {
  delete: boolean;
  edit: boolean;
  file: boolean;
  folder: boolean;
};

const Header = () => {
  const [, setButton] = useLocalStorage({
    defaultValue: {
      delete: false,
      edit: false,
      file: false,
      folder: false,
    },
    key: 'button',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button onClick={(e) => setButton((prev: HeaderTypes) => ({ ...prev, folder: !!e }))}>
          <IconCreateFolder />
        </button>
        <button>
          <IconCreateFile />
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
