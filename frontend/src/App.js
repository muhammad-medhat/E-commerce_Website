import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {useState} from "react";
import { Navbar, Footer } from './components';
import { UserInfo, Login ,Home,Categories, SearchPage,Orders } from './pages';


const App = () => {
    const [searchResults, setSearchResults] = useState([]);

    const searchUpdateHandle = (results) => {
        setSearchResults(results);
    }

    return (
        <BrowserRouter>
            <Navbar searchUpdate={searchUpdateHandle} />
            <Routes>
                <Route path='/categories' element={<Categories />} />
                <Route path='/profile' element={<UserInfo />} />
                <Route path='/login' element={<Login />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/'  element={<Home/>}/>
                 <Route path='/SearchPage' element={<SearchPage results={searchResults} />} />

            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;