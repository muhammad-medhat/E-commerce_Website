import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FaFacebookF ,FaTwitter } from "react-icons/fa";

const Footer = () => (
    <footer className="footer">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            
            <div className="col-md-4 mt-md-0 mt-2">
                <h5 className="text">RandName</h5>
                
            </div>

            <hr className="clearfix d-md-none"/>

            <div className="col-md-2 mb-md-0 mb-2">
                <h5 className="text-uppercase">About</h5>
                <ul className="list-unstyled">
                    <li><a className="text2" href="HOME">HOME</a></li>
                    <li><a className="text2" href="PRODUCTS">PRODUCTS</a></li>
                    <li><a className="text2" href="CATEGORIES">CATEGORIES</a></li>
                    <li><a className="text2" href="FAQs">FAQs</a></li>
                </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-2">
                <h5 className="text-uppercase">Privacy</h5>
                <ul className="list-unstyled">
                    <li><a className="text2" role="button" href="PAYMENT">PAYMENT</a></li>
                </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-2">
                <h5 className="text-uppercase">Get in touch</h5>
                <ul className="list-unstyled">
                    <li className="icons">
                    <Link to="/Facebook"> <FaFacebookF /></Link> 
                    <Link to="/Twitter"> <FaTwitter /></Link>
                    </li>
                    

                </ul>
            </div>
        </div>
    </div>
    <hr />
    <div className="text-center">© 2022 Copyright</div>

</footer>
 
  );
  
  export default Footer;