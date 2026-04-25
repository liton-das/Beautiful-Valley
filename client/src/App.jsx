import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './pages/client-pages/Home';
import DashboardLayoutes from './layoutes/DashboardLayoutes';
import ClientLayoute from './layoutes/ClientLayoute';
import Dashboard from './pages/dashboard-pages/Dashboard';

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route>
        {/* Client Route */}
        <Route path='/' element={<ClientLayoute/>}>
            <Route index element={<Home/>}/>
        </Route>
        {/* Dashboard Route */}
        <Route path='/dashboard' element={<DashboardLayoutes/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
      </Route>
    </Route>
  ))
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
