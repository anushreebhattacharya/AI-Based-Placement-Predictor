import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Prediction from '../pages/Prediction';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import History from '../pages/History';
import Gap from '../pages/Gap'

const AppRoutes = ()=>{
    return(
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/prediction' element={<Prediction />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/gap-analyzer' element={<Gap />}></Route>
      </Routes>
    )
}

export default AppRoutes;