import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import '../src/styles/index.css'
import AddTask from '/src/components/AddTask/AddTask.jsx'
import List from '/src/components/TaskList/TaskList.jsx'
import Layout from './Layout.jsx'
import UpdateTask from './components/Update/UpdateTask.jsx';
import Signup from './components/SignUp/Signup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<List />}/>
      <Route path='/add' element={<AddTask />}/>
      <Route path='/update/:id' element={<UpdateTask />}/>
      <Route path='/signup' element={<Signup />}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
