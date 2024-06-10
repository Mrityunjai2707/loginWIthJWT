import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import React from 'react';
import AllTours from './Components/AllTours';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/alltours" element={<AllTours />} />
    
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
