import { createBrowserRouter } from 'react-router-dom';
import All from './pages/all';
import Manufacturer from './pages/manufacturer';
import Services from './pages/services';
import Layout from './components/layout';
import Product from './pages/product';
import Products from './pages/products';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <All />,
      },
      {
        path: 'manufacturer',
        element: <Manufacturer />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <Product />,
      },
      {
        path: 'lovely',
        element: <Services />,
      },
      {
        path: 'shopping',
        element: <Services />,
      },
      {
        path: 'profile',
        element: <Services />,
      },
    ],
  },
]);
