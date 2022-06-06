import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { Navbar } from './components';
import Footer from './components/Footer/Footer.js';
import Orders from './pages/Orders/Orders';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/profile' element={<Orders />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;