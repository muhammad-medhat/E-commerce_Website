import { getCategories, getCategoryProducts } from "./allAPIs/categories";

const api = "http://localhost:3001";

const headers = {
  Accept: "application/json",
};

/* USER LOGIN - REGISTER - LOGOUT */
export const register = ({ ...props }) =>
  fetch(`${api}/api/users/register`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

export const login = ({ ...props }) =>
  fetch(`${api}/api/users/login`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data);



/***************************************************
 * Category functions
 ***************************************************/

/**********************************************
 * Product functions
 *********************************************/



/*********************************************
 * brand functions
 ***********************************************/
/**
 *  @desc    get all Brand
 *  @route   GET /api/brand/
 *  @access  Public
 * */
export const getBrands = () =>
  fetch(`${api}/api/brand`)
    .then((res) => res.json())
    .then((data) => data);

/**
 *  @desc    Get Brand products
 *  @route   GET /api/brand/:id/products
 *  @access  Public
 * */
export const getBrandProducts = (id) =>
  fetch(`${api}/api/brand/${id}/products`)
    .then((res) => res.json())
    .then((data) => data);

/**
 *  @desc    Get a Single Brand
 *  @route   GET /api/brand/:id
 *  @access  Public
 * */
export const getBrandById = (id) =>
  fetch(`${api}/api/brand/${id}`)
    .then((res) => res.json())
    .then((data) => data);

/** admin functions
 * ******************************************/

/**
 * @desc    Create Brand
 * @route   POST /api/brand/
 * @access  Private
 */
export const createBrand = ({ ...props }) =>
  fetch(`${api}/api/brand`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @desc    Delete Brand
 * @route   DELETE /api/brand/:id
 * @access  Private
 * */
export const deleteBrand = (id) =>
  fetch(`${api}/api/brand/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @desc    update Brand
 * @route   PUT /api/brand/:id
 * @access  Private
 * */
export const updateBrand = ({ ...props }) =>
  fetch(`${api}/api/brand/${props.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);
/************************************************
 * Order functions for loggedin user
 ************************************************/

/**
 * @Desc get all Orders
 * @route GET api/orders/
 * @access Private user
 */
export const getOrders = () =>
  fetch(`${api}/api/orders`)
    .then((res) => res.json())
    .then((data) => data);

/**
 * @Desc Gets a single Order by its id
 * @route GET api/orders/:id
 * @access Private user
 */
export const getOrderById = (id) =>
  fetch(`${api}/api/orders/${id}`)
    .then((res) => res.json())
    .then((data) => data);

/**
 * @Desc Cancel an Order
 * @route Delete api/orders/:id
 * @access Private admin
 */
export const cancelOrder = (id) =>
  fetch(`${api}/api/orders/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @Desc Create an Order
 * @route POST api/orders/
 * @access Private user
 */
export const createOrder = ({ ...props }) =>
  fetch(`${api}/api/orders`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @Desc Update an Order
 * @route PUT api/orders/:id
 * @access Private admin
 */

/**
 * this function will update an order
 * Admin can update order status
 */

export const updateOrder = ({ ...props }) =>
  fetch(`${api}/api/orders/${props.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @Desc checkout order
 * @route PUt api/orders/:id/checkout
 * @access Private user
 * @body {
 *    shippintAddress
 * }
 *  */

export const checkoutOrder = (id, body) =>
  fetch(`${api}/api/orders/${id}/checkout`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @Desc get delivery time
 * @route GET api/orders/:id/delivery
 * @access Private user
 *  */
export const getDeliveryTime = (id) =>
  fetch(`${api}/api/orders/${id}/delivery`)
    .then((res) => res.json())
    .then((data) => data);

/******************************************************
 * cart functions
 *****************************************************/

/**
 * @desc    Get all the elements in the cart
 * @route   GET /api/cart/
 * @access  private
 */
export const getCart = () =>
  fetch(`${api}/api/cart`)
    .then((res) => res.json())
    .then((data) => data);

/**
 *  @desc    Add an item to the cart
 *  @route   PUT /api/cart/add
 *  @access  private
 * */
export const addToCart = ({ ...props }) =>
  fetch(`${api}/api/cart/add`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @desc    Remove an item from the cart
 * @route   PUT /api/cart/remove
 * @access  private
 * */
export const removeFromCart = ({ ...props }) =>
  fetch(`${api}/api/cart/remove`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @Desc get user`s cart
 * @route GET /api/cart/:id/user
 * @access Private
 */
export const getUserCart = (id) =>
  fetch(`${api}/api/cart/${id}/user`)
    .then((res) => res.json())
    .then((data) => data);

/***********************************************
 * contactus functions
 */

/**
 * @desc    customer can send a query or complaints
 * @route   POST /api/customer/
 * @access  Public
 * */
export const sendQuery = ({ ...props }) =>
  fetch(`${api}/api/customer`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @desc    Admin get all cutomers' query or complaints
 * @route   GET /api/customer/
 * @access  Private
 * */
export const getQueries = () =>
  fetch(`${api}/api/customer`)
    .then((res) => res.json())
    .then((data) => data);

/**
 * @desc    Admin delete a cutomers' query or complaints
 * @route   DELETE /api/customer/
 * @access  Private
 * */
export const deleteQuery = (id) =>
  fetch(`${api}/api/customer/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.status);

/******************************************
 * coupon functions
 */
/**
 * @desc    Create Coupon
 * @route   POST /api/coupon/
 * @access  Private
 * */
export const createCoupon = ({ ...props }) =>
  fetch(`${api}/api/coupon`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
    .then((res) => res.json())
    .then((data) => data.status);

/**
 * @desc    get all Coupons
 * @route   GET /api/coupon/
 * @access  Private
 */
export const getCoupons = () =>
  fetch(`${api}/api/coupon`)
    .then((res) => res.json())
    .then((data) => data);

/**
 * @desc    get a Coupons
 * @route   GET /api/coupon/:id
 * @access  Private
 * */
export const getCoupon = (id) =>
  fetch(`${api}/api/coupon/${id}`)
    .then((res) => res.json())
    .then((data) => data);
    /*************************************** */
/**
 * 
 * 
 */
export default {
  api
}