import {Aside} from '../../components/index';
import {Form, Button } from 'react-bootstrap';
import React ,{ useState, useEffect } from 'react';
import { SubHeading } from '../../components';

import './Cart.css'



const Cart = () => {
    return (
        <div className='Cart'>  
        <h1 className='Titel mb-5'>My Cart</h1>
          <div className="row">
             <h1 className='Titel1 mb-5'>Product</h1>
              <h1 className='Titel2 mb-5'>Price</h1>
               <h1 className='Titel3 mb-5'>Quantity</h1>
                <h1 className='Titel4 mb-5'>Total</h1>
                
                <div className="Cart__wrapper-Titel mb-4 ">
            </div>
            
             
            </div> <h1 className='Titel6 mb-5'>Shipping:</h1>
                <h1 className='Titel7 mb-5'>Subtotal:</h1>
                <div className="Cart__wrapper-Titel3 mb-4 ">
                </div>
                 <h1 className='Titel8 mb-5'>Total:</h1>
                 
           <Button className='btn1'  href='/'>Continue shopping</Button>
           <Button className='btn2'  href='/'>Check out</Button>
         </div>
    )

 }

export default Cart