import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'styles/global.scss';

import Main from 'pages/main';

import CreateFolderContext, { initialState } from 'contexts/createFolderContext';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
]);

const App = () => {
  const createFolder = useState(initialState);

  return (
    <CreateFolderContext.Provider value={createFolder}>
      <RouterProvider router={router} />
    </CreateFolderContext.Provider>
  );
};

export default App;
