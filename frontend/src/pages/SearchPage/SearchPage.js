

import CreateCard from "./../../components/CreateCard/CreateCard";
import "./SearchPage.css"

const SearchPage = ({results}) => {
    
  console.log(results)

  return (
    <div className="search-page">
      <div className="search-results">
        <ol className="results-grid" >
          {results.map( (product) =>
            <CreateCard key={product.id} Product={product} />
          )}
        </ol>
      </div>
    </div>
  )
};

export default SearchPage;