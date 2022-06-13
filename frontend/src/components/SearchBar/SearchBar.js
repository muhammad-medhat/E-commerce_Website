
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

  const clickHandle = ()=> {
    if(activeSearch === false) { setActiveSearch(true) }
    getAllProducts();
  };

  const changeHandle = (event) => { setSearchValue(event.target.value); } ;
  
  const submitHandle = (event) => {
    event.preventDefault();

    let searchResults = products.filter( f => f.name.toLowerCase().includes(searchValue.toLowerCase()) );
    
    searchUpdate(searchResults);
    setSearchValue("")
  };

  return (
    <div>
      {activeSearch? 
      <form className='search-input' onSubmit={submitHandle} >
        <input 
          type="text"
          placeholder='looking for?'
          value={searchValue}
          onChange={changeHandle}
        />
      </form>
        : 
      <Link to='./SearchPage' onClick={clickHandle} >
        < AiOutlineSearch/>
      </Link> 
      }
    </div>
  )
};

export default SearchBar ;