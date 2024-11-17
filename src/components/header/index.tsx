import { useContext } from 'react';

import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import CreateFolderContext from 'contexts/createFolderContext';

import styles from './styles.module.scss';

const Header = () => {
  const [, setClickButton] = useContext(CreateFolderContext);

  const handleCreateFolder = () => {
    if (setClickButton) {
      setClickButton((prev) => ({ ...prev, folder: true }));
    }
  };

  const handleCreateFile = () => {
    if (setClickButton) {
      setClickButton((prev) => ({ ...prev, file: true }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button onClick={handleCreateFolder}>
          <IconCreateFolder />
        </button>
        <button onClick={handleCreateFile}>
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
