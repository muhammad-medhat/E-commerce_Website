import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './navbar.css';
const Navbar = ({searchUpdate}) => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href='#landing'>Orderat</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="s">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#home">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#home">Categories</a>
                        </li>
                    </ul>
                <div className="d-flex icons">
                        <SearchBar searchUpdate={searchUpdate} />
                    <Link to="/shoppingcart">
                        <AiOutlineShoppingCart />
                    </Link>
                    <Link to="/profile">
                        <FaUser />
                    </Link>
                </div>
                </div>
            </div>
        </nav></>
    )
}

export default Navbar