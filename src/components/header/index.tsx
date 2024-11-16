import { useContext } from 'react';

import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import CreateFolderContext from 'contexts/createFolderContext';
// import { useLocalStorage } from 'hooks/useLocalStorage';

import { HeaderTypes } from 'types';

import styles from './styles.module.scss';

const Header = () => {
  const [clickButton, setClickButton] = useContext(CreateFolderContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button onClick={(e) => setClickButton((prev: HeaderTypes) => ({ ...prev, folder: !!e }))}>
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
