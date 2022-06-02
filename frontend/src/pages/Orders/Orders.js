import React, { useState } from 'react'
import {Aside} from '../../components/index';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';

import './orders.css'
const products = [
    {id: '1k21', name: "Prada l'homme", price: '$230.00', brand: "Prada"},
    {id: '2v2d1', name: "Versace Eros", price: '$430.00', brand: "Versace"},
    {id: '3l4h', name: "Bleu de Chanel", price: '$134.00', brand: "Chanel"},
    {id: '55ed', name: "Nike Air", price: '$130.00', brand: "Nike"},
]
const Orders = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(clicked => !clicked)
    }
    return (
        <div className='orders_wrapper'>
                <Aside />
                <div className='orders_wrapper-content d-flex w-100 p-5'>
                    <h1 className='mb-5'>My Orders</h1>
                    <div className="order_wrapper-content_items w-75">
                        <div className="order_wrapper-content_items_product mb-5">
                            <button class="btn info_button w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#orderOne" aria-expanded="true" aria-controls="collapseExample" onClick={() => handleClick()}>
                                <p className='m-0'>Order #1232</p>
                                {clicked ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </button>
                            <div class="collapse" id="orderOne">
                                <div class="card card-body">
                                    {products.map((product) => (
                                        <div className='product_item d-flex align-items-center justify-content-between w-100' key={product.id}>
                                            <p>{product.name}</p>
                                            <div className="product_info d-flex align-items-center">
                                                <p className='me-5'>{product.brand}</p>
                                                <p className='price'>{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order_wrapper-content_items_product mb-5">
                            <button class="btn info_button w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#orderTwo" aria-expanded="true" aria-controls="collapseExample" onClick={() => handleClick()}>
                                <p className='m-0'>Order #1232</p>
                                {clicked ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </button>
                            <div class="collapse" id="orderTwo">
                                <div class="card card-body">
                                    {products.map((product) => (
                                        <div className='product_item d-flex align-items-center justify-content-between w-100' key={product.id}>
                                            <p>{product.name}</p>
                                            <div className="product_info d-flex align-items-center">
                                                <p className='me-5'>{product.brand}</p>
                                                <p className='price'>{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order_wrapper-content_items_product">
                            <button class="btn info_button w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#orderThree" aria-expanded="true" aria-controls="collapseExample" onClick={() => handleClick()}>
                                <p className='m-0'>Order #1232</p>
                                {clicked ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </button>
                            <div class="collapse" id="orderThree">
                                <div class="card card-body">
                                    {products.map((product) => (
                                        <div className='product_item d-flex align-items-center justify-content-between w-100' key={product.id}>
                                            <p>{product.name}</p>
                                            <div className="product_info d-flex align-items-center">
                                                <p className='me-5'>{product.brand}</p>
                                                <p className='price'>{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Orders