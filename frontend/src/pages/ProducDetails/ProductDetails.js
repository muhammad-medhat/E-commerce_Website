import React from 'react'
import Subheading from '../../components/SubHeading/Subheading';
import {useSelector} from 'react-redux';
import './productdetails.css';


const ProductDetails = () => {
    const product = useSelector(state => state.products.selectedProduct[0]);
    console.log(product);
    return (
        <div className='details__wrapper pt-4 pb-4'>
            <div className="container">
                <Subheading title="Product" />
                <div className="details__wrappper-content">
                    <div className="row">
                        <div className="details__img col-sm-12 col-md-6">
                            <img src={product.images[1]} alt="s"/>
                        </div>
                        <div className="details__info col-sm-12 col-md-6">
                            <div className="details__info-head d-flex justify-content-between align-items-center mb-4">
                                    <h3>{product.name}</h3>
                                    <p style={{fontSize: '36px', marginRight: 50}}>${product.price}</p>
                            </div>
                            <h3 className='mb-3'>Product Details</h3>
                            <ul className='info__list'>
                                <li>{product.description}</li>
                                <li>Stock: {product.quantityInStock}</li>
                                <li>Delivery time: {product.daysTillDelivery > 1 ? (<span>{product.daysTillDelivery} days</span>) :  (<span>{product.daysTillDelivery} day</span>)}</li>
                            </ul>
                            <div className="quantity__wrapper mt-4 d-flex justify-content-between align-items-center">
                                <div className='quantity'>Quantity: </div>
                                <button className='add'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails