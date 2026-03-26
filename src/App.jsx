import { memo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

function App() {
  // const [count, setCount] = useState(0);

  return <RouterProvider router={routes} />;
}

export default memo(App);
