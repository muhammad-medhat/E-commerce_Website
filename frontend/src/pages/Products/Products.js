import React, { useEffect} from 'react'
import { SubHeading } from '../../components';
import './product.css';
import {ProductCard} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../features/slice/productsSlice';

const Products = () => {
    let {allProducts} = useSelector(state => state.products);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);

    

    return (
        <div className='products__wrapper'>
            <div className="container">
                <SubHeading title="Products"/>
                <div className="products__wrapper-items pt-3 pb-3">
                    <div className="row">
                        {allProducts 
                        ? allProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        )) 
                        : (<div style={{position: "relative", top: "50%", left: "50%", fontSize: 24}}>loading...</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products