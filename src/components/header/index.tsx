import { useContext } from 'react';

import BreadCrumbs from 'components/breadCrumbs';

import CreateFolderContext from 'contexts/createButtonContext';

import { handleButton } from 'helpers/handleButton';

import { config } from './const';

import styles from './styles.module.scss';

const Header = () => {
  const [, setClickButton] = useContext(CreateFolderContext);

  return (
    <div className={styles.wrapper}>
      <div>
        <BreadCrumbs />
      </div>
      <div className={styles.panelControl}>
        {config.map(({ img, type }, index) => (
          <button
            key={type + index}
            onClick={handleButton(type, setClickButton)}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
