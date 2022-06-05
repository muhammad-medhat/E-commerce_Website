import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { FaFacebookF ,FaTwitter } from "react-icons/fa";

const Footer = () => (
    <footer className="footer">
    <div className="container-fluid">
        <div className="row">
            
            <div className="col-4">
                <h5 className="text">RandName</h5>
                
            </div>

            <hr className="clearfix d-md-none"/>

            <div className="col-3">
                <h5 className="text-uppercase">About</h5>
                <ul className="list-unstyled">
                    <li><a className="text2" href="HOME">HOME</a></li>
                    <li><a className="text2" href="PRODUCTS">PRODUCTS</a></li>
                    <li><a className="text2" href="CATEGORIES">CATEGORIES</a></li>
                    <li><a className="text2" href="FAQs">FAQs</a></li>
                </ul>
            </div>

            <div className="col-3">
                <h5 className="text-uppercase">Privacy</h5>
                <ul className="list-unstyled">
                    <li><a class="text2" role="button" href="PAYMENT">PAYMENT</a></li>
                </ul>
            </div>

            <div className="col-2">
                <h5 className="text-uppercase">Get in touch</h5>
                <ul className="list-unstyled-center">
                    <li className="d-flex icons">
                    <Link to="/Facebook"><FaFacebookF /></Link> 
                    <p className="space">. .</p>
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