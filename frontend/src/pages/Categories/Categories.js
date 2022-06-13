import React, { useEffect, useState } from 'react';
import './categories.css';
import catImg from '../../assets/image.png';
import hatImg from '../../assets/hat.jpg';

const Categories = () => {
    const [category, setCategory] = useState([]);
    console.log(category);
    useEffect(() => {
        fetch("http://localhost:3001/api/categories")
        .then(res => res.json())
        .then(data => setCategory(data.categories));
    }, [])
    return (
        <div className="category__wrapper">
            <div className="container">
                <h4 className="category__wrapper_head text-uppercase mb-5">Categories</h4>
                <div className="category__wrapper-women mb-4 pt-2 pb-2">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Women</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                            {category.map((cat) => {
                                if(cat.name.slice(0, 6) === "womens") {
                                    return (<div className='col-4 mb-4 d-flex justify-content-center align-items-center' style={{cursor: "pointer"}} key={cat._id} ><img style={{width: 56, height: 52}} src={catImg} alt="catImg" />{cat.name.slice(7)}</div>)
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        </div>
                    </div>
                </div>

                <div className="category__wrapper-men mb-4 pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Men</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                            {category.map((cat) => {
                                if(cat.name.slice(0, 4) === "mens") {
                                    return (<div className='col-4 mb-4 d-flex justify-content-center align-items-center' key={cat._id} ><img style={{width: 46, height: 42, marginRight: 10}} src={hatImg} alt="catImg" />{cat.name.slice(5)}</div>)
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        </div>
                    </div>
                </div>

                <div className="category__wrapper-all mb-2 pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-12 col-lg-2">
                            <h2>Other Categories</h2>
                        </div>
                        <div className="col-md-12 col-lg-10">
                        <div className="row">
                            {category.map((cat) => {
                                if(cat.name.slice(0, 4) === "mens" || cat.name.slice(0, 6) === "womens") {
                                    return null
                                } else {
                                    return (<div className='col-4 mb-4 d-flex justify-content-center align-items-center' key={cat._id} ><img style={{width: 46, height: 42, marginRight: 10}} src={hatImg} alt="catImg" />{cat.name}</div>);
                                }
                            })}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories;