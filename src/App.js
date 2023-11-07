import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/homepage';
import Menu from './components/Menu';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
