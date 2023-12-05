import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/homepage';
import Menu from './components/Menu';
import SearchPage from './pages/search';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import PlayerComponent from './components/Player';
import Library from './pages/library';
import ArtistPage from './pages/artist';
// import SongPage from './pages/song';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <SearchPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/library',
    element: <Library />
  },
  {
    path: '/artist/:artistName',
    element: <ArtistPage />
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
      <PlayerComponent />
    </>
  );
}

export default App;
