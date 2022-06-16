
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import * as allAPIs from "./../../allAPIs";
import "./SearchBar.css"

const SearchBar = ({searchUpdate}) => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  const getAllProducts = async ()=> {
    let res = await allAPIs.getAllProducts();

    const {products} = res;
    
    console.log(products);
    setProducts(products);
  };

  const clickHandle = (event)=> {
    //event.preventDefault();
    if(event.target.name === "collapse") {
      setActiveSearch(false) 
      //window.location.replace("http://localhost:3000/products");
    }
    if(!activeSearch) { 
      setActiveSearch(true) 
      getAllProducts();
    }

    let searchResults = products.filter( f => f.name.toLowerCase().includes(searchValue.toLowerCase()) );
    
    searchUpdate(searchResults);
    setSearchValue("")
  };

  const changeHandle = (event) => { setSearchValue(event.target.value); } ;
  
  return (
    <div className='show-flex' >
      <Link to='./SearchPage' onClick={clickHandle} className='search-icon'  >
        < AiOutlineSearch />
      </Link>  
      
      <div className='show-flex'>
        {activeSearch &&
        <input 
          type="text"
          placeholder='looking for?'
          value={searchValue}
          onChange={changeHandle}
        /> 
        } 
          
        {activeSearch &&
        <button className="collapse-button" onClick={clickHandle} name="collapse" />
        }
      </div>
    </div>
  )
};

export default SearchBar ;