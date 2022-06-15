import React ,{ useState, useEffect } from 'react';
import { Carousel ,Button ,Card} from 'react-bootstrap';
import './home.css';
import{BsCartPlus}from"react-icons/bs"
import { Link } from 'react-router-dom';
import Banner1 from "../../assets/images/banner_1.jpg";
import Banner2 from "../../assets/images/banner_2.jpg";
import Banner3 from "../../assets/images/banner_3.jpg";

const Home = () => {
  
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
      fetch('http://localhost:3001/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [])
  const size = 6

  
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
                   <a  className="btn2" href="/products"  type="submit">New Offers</a>
       <div className="container">
             <div className="row">
                   <div className="banner">
                   <div className="row">
                    <div className="col-md-4">
                      <div className="banner_item align-items-center" style={{backgroundImage: `url(${Banner1})`}} data-aos="fade-right">
                        <div className="banner_category">
                        <a href="/categories">women's</a>
                        </div>
                      </div>
                    </div>
                   <div className="col-md-4">
                        <div className="banner_item align-items-center" style={{ backgroundImage: `url(${Banner2})` }} data-aos="fade-up">
                          <div className="banner_category">
                           <a href="/categories">Other</a>
                           </div>
                       </div>
                    </div>
                     <div className="col-md-4">
                       <div className="banner_item align-items-center" style={{ backgroundImage: `url(${Banner3})` }} data-aos="fade-left">
                       <div className="banner_category">
                         <a href="/categories">men's</a>
                        </div>
                       </div>
                      </div>
                     </div>
                     <h2 className="product " >SHOP OUR</h2>
                      <h2 className="product" >BESTSELLERS</h2>
                   </div>
                      <h2 className="product" ></h2>
                            {products.slice(0, size).map((product) => 
                            <div className='col-4 mb-4 d-flex justify-content-center' key={product._id} >
                              <Card  >
                                <Card.Img className="CImg" hash ="/"variant="top" src={product.mainImage} />
                                <Card.Body className= "card">
                                  <Card.Title className="Title">{product.name}</Card.Title>
                                  <Card.Text className="d-flex justify-content-end">

                                  
                                 <Link to="/cart">
                                    <BsCartPlus/> 
                                    </Link>
                                      $ {product.price} 
                                  </Card.Text>
                                  <Button className= "cart" >View Product</Button>
                                </Card.Body>
                              </Card>
                           </div>)
                            }
                            
                  
                    </div>
                    <Carousel>
                    <Carousel.Item>
                   <img  alt="img1"  width="100%" src="https://i.pinimg.com/originals/99/8c/1e/998c1e6aa1606358a39885fcb926e402.jpg" />
                    <Carousel.Caption>
                     <a className="btn3" href="/products" type="submit">New Offers</a>
                    </Carousel.Caption>
                 </Carousel.Item>
                   
                  <Carousel.Item>
                     <img  alt="img2" width="100%"  src="https://i.pinimg.com/originals/e9/1e/af/e91eafd2a4e1da6d93af690f433c374c.jpg" />
                     <Carousel.Caption>
                     <a className="btn3" href="/products"  type="submit">New Offers</a>
                    </Carousel.Caption>
                  </Carousel.Item>
                  </Carousel>
               </div>
          </div>
    )
}

export default Home;