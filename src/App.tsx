import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Main from 'pages/main';

const router = createBrowserRouter([
  {
    element: <Main />,
    path: '/',
  },
]);

import 'styles/global.scss';

const App = () => <RouterProvider router={router} />;

export default App;
