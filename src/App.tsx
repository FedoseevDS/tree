import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'styles/global.scss';

import Main from 'pages/main';

import CreateButtonContext, { initialState } from 'contexts/createButtonContext';

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
    <CreateButtonContext.Provider value={createFolder}>
      <RouterProvider router={router} />
    </CreateButtonContext.Provider>
  );
};

export default App;
