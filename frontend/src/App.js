import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { Navbar, Footer } from './components';
import { UserInfo, Login ,Home } from './pages';


const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/profile' element={<UserInfo />} />
                <Route path='/login' element={<Login />} />
                <Route path='/'  element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;