import React from 'react';
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

import './navbar.css';
const Navbar = () => {
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
                    <Link to="/search">
                        <AiOutlineSearch />
                    </Link>
                    <Link to="/cart">
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