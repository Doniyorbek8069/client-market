import { createBrowserRouter } from 'react-router-dom';
import All from './pages/all';
import Manufacturer from './pages/manufacturer';
import Lovely from './pages/lovely';
import Layout from './components/layout';
import Product from './pages/product';
import Products from './pages/products';
import Company from './pages/company';

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
        element: <Lovely />,
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
        path: 'company/:id',
        element: <Company />,
      },
      {
        path: 'lovely',
        element: <Lovely />,
      },
      {
        path: 'shopping',
        element: <Lovely />,
      },
      {
        path: 'profile',
        element: <Lovely />,
      },
    ],
  },
]);
