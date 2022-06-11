import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { Navbar, Footer } from './components';
import { UserInfo, Login } from './pages';

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