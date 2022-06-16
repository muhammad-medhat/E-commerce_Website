import React  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {useState} from "react";
import { Navbar, Footer } from './components';

import { UserInfo, Orders, Login, Categories, Products, ProductDetails, SearchPage, Home ,FAQs,Cart,Security } from './pages';






const App = () => {
    
    const [searchResults, setSearchResults] = useState([]);

    const searchUpdateHandle = (results) => {
        setSearchResults(results);
    }

    return (
        <BrowserRouter>
            <Navbar searchUpdate={searchUpdateHandle} />
            <Routes>
                <Route path='/products' element={<Products />} />
                <Route path='/productDetails' element={<ProductDetails />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/profile' element={<UserInfo />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/login' element={<Login />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/faqs' element={<FAQs />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/profile/security' element={<Security />} />

                <Route path='/'  element={<Home/>}/>
                <Route path='/SearchPage' element={<SearchPage results={searchResults} />} />

            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;