import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { Navbar } from './components';
import Footer from './components/Footer/Footer.js';
import UserInfo from './pages/Informations/UserInfo'
import Orders from './pages/Orders/Orders'
import Login from './pages/Log-Reg/Login'
//import Home from'./pages/home/Home'

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/profile' element={<UserInfo />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;