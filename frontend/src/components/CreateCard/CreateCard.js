
import "./CreateCard.css";

const CreateCard = ({Product})=> {

  const addToCart = (event) => { }; /* ADD TO CART */
  
  return (
    <li >
      <div className="Product">
        <div className="Product-top">
          <div className="Product-cover"
            style={{
            width: 128,
            height: 193,
            backgroundImage:`url(${Product.images[0]})`,
            }}
          ></div>

          <div className="Product-AddTo-Cart add" onClick={addToCart} > 
            {/* Put ADD to CART ICON Here */}
          </div>
        </div>

        <div className="Product-name">{Product.name}</div>

        {/* <div className="book-authors">{Book.authors}</div> */}
      </div>
    </li>
  )
}


export default CreateCard ;