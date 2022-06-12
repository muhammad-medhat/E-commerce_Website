
import "./SearchPage.css"

const SearchPage = ({results}) => {
    
    console.log(results)

    return (
        <div className="search-page">
            <div className="search-advanced" >advanced</div>

            <div className="search-results">
                <ol className="results-grid" >list</ol>
            </div>

            <div className="collapse-button">
                <button /* onClick={"somefunctionhere"} */ >collapse</button>
            </div>
        </div>
    )
};

export default SearchPage;