import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {useState} from "react";

import { Navbar } from './components';
import Footer from './components/Footer/Footer.js';
import UserInfo from './pages/Informations/UserInfo'
import Orders from './pages/Orders/Orders'
import Login from './pages/Log-Reg/Login';
import SearchPage from'./pages/SearchPage/SearchPage';
//import Home from'./pages/home/Home'

const App = () => {
    const [searchResults, setSearchResults] = useState([]);

    const searchUpdateHandle = (results) => {
        setSearchResults(results);
    }

    return (
        <BrowserRouter>
            <Navbar searchUpdate={searchUpdateHandle} />
            <Routes>
                <Route path='/profile' element={<UserInfo/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/SearchPage' element={<SearchPage results={searchResults} />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;