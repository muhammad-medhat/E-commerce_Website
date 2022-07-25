import React ,{ useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './home.css';
import K1 from "../../assets/images/K1.jpeg";
import K2 from "../../assets/images/K2.jpeg";
import K3 from "../../assets/images/K3.jpeg"
import { SubHeading } from '../../components';
import {ProductCard} from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../features/slice/productsSlice';


const Home = () => {
  let {allProducts} = useSelector(state => state.products);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchAllProducts())
  }, [dispatch]);

  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
      fetch('http://localhost:3001/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [])
  const size = 8

  
    return (

    <div className='Home'> 
        <Carousel>
          <Carousel.Item>
           <img  alt="img1"  width="100%" src="https://i.pinimg.com/originals/9b/77/79/9b7779faf66ae4a718a481bbab085e8a.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img  alt="img2" width="100%"  src="https://i.pinimg.com/originals/d1/05/41/d1054126719770abf322bd0ec1120f73.jpg" />
          </Carousel.Item>
          </Carousel>
          <a  className="btnn" href="/products"  type="submit">New Offers</a>
       <div className="container">
             <div className="row">
                   <div className="banner">
                   <div className="row">
                    <div className="col-md-4">
                      <div className="banner_item align-items-center" style={{backgroundImage: `url(${K1})`}} data-aos="fade-right">
                        <div className="banner_category">
                        <a href="/categories">women's</a>
                        </div>
                      </div>
                    </div>
                   <div className="col-md-4">
                        <div className="banner_item align-items-center" style={{ backgroundImage: `url(${K3})` }} data-aos="fade-up">
                          <div className="banner_category">
                           <a href="/categories">Other</a>
                           </div>
                       </div>
                    </div>
                     <div className="col-md-4">
                       <div className="banner_item align-items-center" style={{ backgroundImage: `url(${K2})` }} data-aos="fade-left">
                       <div className="banner_category">
                         <a href="/categories">men's</a>
                        </div>
                       </div>
                      </div>
                     </div>
                     <h2 className="product " >SHOP OUR</h2>
                      <h2 className="product" >BESTSELLERS</h2>
                      <SubHeading title=""/>
                   </div> {allProducts 
                        ? allProducts.slice(0,size).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        )) 
                        : (<div style={{position: "relative", top: "50%", left: "50%", fontSize: 24}}>loading...</div>)}
                    </div>
                    <Carousel>
                    <Carousel.Item>
                   <img  alt="img1"  width="100%" src="https://i.pinimg.com/originals/99/8c/1e/998c1e6aa1606358a39885fcb926e402.jpg" />
                    <Carousel.Caption>
                     <a className="btnn1" href="/products" type="submit">New Offers</a>
                    </Carousel.Caption>
                 </Carousel.Item>
                   
                  <Carousel.Item>
                     <img  alt="img2" width="100%"  src="https://i.pinimg.com/originals/e9/1e/af/e91eafd2a4e1da6d93af690f433c374c.jpg" />
                     <Carousel.Caption>
                     <a className="btnn1" href="/products"  type="submit">New Offers</a>
                    </Carousel.Caption>
                  </Carousel.Item>
                  </Carousel>
               </div>
          </div>
    )
}

export default Home;