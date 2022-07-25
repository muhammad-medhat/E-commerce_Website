import React, { useState } from 'react'
import Subheading from '../../components/SubHeading/Subheading';
import {useSelector} from 'react-redux';
import {AiOutlineMinus,AiOutlinePlus, AiTwotoneStar} from 'react-icons/ai';
import './productdetails.css';


const ProductDetails = () => {

    const [quantityCounter, setQuantityCounter] = useState(1);
    const stars = [];
    const product = useSelector(state => state.products.selectedProduct[0]);
    console.log(product);

    const handleQuantityAddition = () => {
        setQuantityCounter(quantityCounter + 1);
    }

    const handleQuantitySubtraction = () => {
        if (quantityCounter > 0) {
            setQuantityCounter(quantityCounter - 1);
        }
    }

    
        for(let i = 1; i <= 5; i++) {
            stars.push(<AiTwotoneStar className='ms-2'/>);
        }
        console.log(stars)

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
                                <div className='quantity__container d-flex justify-content-between align-items-center'>
                                    <p className='me-3 p-0 mb-0'>Quantity: </p>
                                    <AiOutlineMinus style={{color:"#795548", cursor: "pointer"}} onClick={() => handleQuantitySubtraction()}/>
                                    <div className="quantity ms-3 me-3 pb-2" style={{fontSize: 40}}>{quantityCounter}</div>
                                    <AiOutlinePlus style={{color:"#795548", cursor: "pointer"}} onClick={() => handleQuantityAddition()}/>
                                </div>
                                <button className='add__cart'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews__container mt-5 mb-5 w-50">
                    <div className="container">
                        <div className="total__reviews d-flex align-items-center mb-4">
                            <h3 className='m-0'>Total Reviews: </h3>
                            <p className='m-0'>{ stars.map((star, index) => ( <span key={index}>{star}</span> ))}</p>
                        </div>
                        <div className="customers-reviews">
                            <h5>Customer 1: </h5>
                            <p className='m-1'>{ stars.map((star, index) => ( <span key={index}>{star}</span> ))}</p>
                            <p className='ms-3'>brilliant product. Exactly as shown. High quality would buy again.</p>

                            <h5 className='mt-4'>Customer 2: </h5>
                            <p className='m-1'>{ stars.map((star, index) => ( <span key={index}>{star}</span> ))}</p>
                            <p className='ms-3'>Quality is very good.</p>
                        </div>

                        <div className="write__review mb-4 ">
                            <button className='write__review-button'>Write a review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails