import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/homepage';
import Menu from './components/Menu';
import SearchPage from './pages/search';
// import SongPage from './pages/song';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <SearchPage />
  }
  // {
  //   path: "/track/:id",
  //   element: <SongPage />
  // }
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
