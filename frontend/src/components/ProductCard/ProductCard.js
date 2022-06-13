import React, {useState} from 'react';
import {BsCartPlus, BsCartCheck} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProductDetails } from '../../features/slice/productsSlice';

const ProductCard = ({product}) => {

    const [addToCart, setaddToCart] = useState(false);
    const dispatch = useDispatch();
    const handleAddToCart = (id) => {
        setaddToCart(prev => !prev)
    }

    const handleClick = () => {
        dispatch(addProductDetails([product]));
    }

    return (
        <div className="products__wrapper-items_product col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card" style={{width: "18rem"}}>
                <Link to="/productDetails">
                    <img src={product.mainImage} className="card-img-top" alt={product.name} onClick={() => handleClick()}/>
                </Link>
                <div className="card-body pt-4 pb-4">
                    <div className="item-info d-flex justify-content-between">
                        <h6 className="card-title">{product.name}</h6>
                        <p>Stock: {product.quantityInStock}</p>
                    </div>
                    <p className="card-text mb-3">{product.description}</p>
                    <div className="item-price d-flex align-items-center justify-content-between ps-2 pe-2">
                        <h5>Price: ${product.price}</h5>
                        {addToCart 
                        ? <BsCartCheck style={{fontSize: 20, color: "green", cursor: "pointer"}} onClick={() => handleAddToCart(product._id)}/>
                        : <BsCartPlus style={{fontSize: 20, color: "#f44336", cursor: "pointer"}} onClick={() => handleAddToCart(product._id)}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard