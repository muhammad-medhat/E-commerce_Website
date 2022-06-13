import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa';

import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './navbar.css';
const Navbar = ({searchUpdate}) => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/home'>Orderat</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="categories">Categories</NavLink>
                        </li>
                    </ul>
                <div className="d-flex icons">
<<<<<<< HEAD
                    <Link to="/search">
                        <AiOutlineSearch />
                    </Link>
                    <Link to="/cart">
=======
                        <SearchBar searchUpdate={searchUpdate} />
                    <Link to="/shoppingcart">
>>>>>>> 6492a87b547d07b9c8dcbc8f011a096f2c93d375
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