

import ProductCard from "./../../components/ProductCard/ProductCard";
import "./SearchPage.css"

const SearchPage = ({results}) => {
    
  console.log(results)

  return (
    <div className="search-page products__wrapper ">  {/*  */}
      <div className="container">
        <div className="search-results products__wrapper-items pt-3 pb-3 ">   {/*  */}
          <div className="row">
            {results && results.map( (product) =>
              <ProductCard key={product.id} product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default SearchPage;