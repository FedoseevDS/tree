import { useContext } from 'react';

import IconCreateFile from 'assets/createFile.svg?react';
import IconCreateFolder from 'assets/createFolder.svg?react';
import IconDelete from 'assets/delete.svg?react';
import IconEdit from 'assets/edit.svg?react';

import CreateFolderContext from 'contexts/createButtonContext';

import { handleButton } from 'helpers/handleButton';

import styles from './styles.module.scss';

const Header = () => {
  const [, setClickButton] = useContext(CreateFolderContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumbs}>Корень /</div>
      <div className={styles.panelControl}>
        <button onClick={handleButton('folder', setClickButton)}>
          <IconCreateFolder />
        </button>
        <button onClick={handleButton('file', setClickButton)}>
          <IconCreateFile />
        </button>
        <button>
          <IconEdit />
        </button>
        <button onClick={handleButton('delete', setClickButton)}>
          <IconDelete />
        </button>
      </div>
    </div>
  );
};

export default Header;
