import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPanel } from '../admin-panel';
import { ProductTypesState } from '../admin-panel/context';
import { Home } from '../home';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/admin-panel',
      element: <AdminPanel />,
    },
  ]);

  return (
    <ProductTypesState>
      <RouterProvider
        router={router}
        // fallbackElement={<BigSpinner />}
      />
    </ProductTypesState>
  );
};
