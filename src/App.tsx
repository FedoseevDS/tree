import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'styles/global.scss';

import Main from 'pages/main';

import BooleanButtonsContext, { initialState } from 'contexts/booleanButtonsContext';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
]);

const App = () => {
  const createFolder = useState(initialState);

  return (
    <BooleanButtonsContext.Provider value={createFolder}>
      <RouterProvider router={router} />
    </BooleanButtonsContext.Provider>
  );
};

export default App;
