// import { useDebugValue } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPastes from './components/ViewPastes';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/paste",
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPastes />
      </div>
    }
  ]
)
function App() {

  return (
  <div>
    <Toaster/>
    <RouterProvider router={router}/>

  </div>
  )
}

export default App
