import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/homepage';
import Menu from './components/Menu';
import SearchPage from './pages/search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <SearchPage />
  }
]);

function App() {
  return (
    <>
      <Menu currentPage={router.basename}/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
