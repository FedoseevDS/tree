import { useState } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CreateFolderContext, { initialState } from 'contexts/createFolderContext';

import Main from 'pages/main';

import 'styles/global.scss';

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
