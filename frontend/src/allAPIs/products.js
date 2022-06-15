/**
 * @desc    GET all Products
 * @route   GET /api/products/
 * @access  Public
 */
 export const getProducts = () =>
 fetch(`${api}/api/products`)
   .then((res) => res.json())
   .then((data) => data);

/**
* @desc    GET single product
* @route   GET /api/products/:id
* @access  Public
*/
export const getProductById = (id) =>
 fetch(`${api}/api/products/${id}`)
   .then((res) => res.json())
   .then((data) => data);
/**************** Admin  ************/

/**
* @desc    Delete product (set stock to 0)
* @route   DELETE /api/products/:id
* @access  Private Admin
* */
export const deleteProduct = (id) =>
 fetch(`${api}/api/products/${id}`, {
   method: "DELETE",
   headers: {
     ...headers,
     "Content-Type": "application/json",
   },
 })
   .then((res) => res.json())
   .then((data) => data.status);

/**
* @desc    Create product
* @route   POST /api/products/
* @access  Private Admin
*/
export const createProduct = ({ ...props }) =>
 fetch(`${api}/api/products`, {
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
* @desc    Update product
* @route   Put /api/products/:id
* @access  Private
*/
export const updateProduct = ({ ...props }) =>
 fetch(`${api}/api/products/${props.id}`, {
   method: "PUT",
   headers: {
     ...headers,
     "Content-Type": "application/json",
   },
   body: JSON.stringify({ ...props }),
 })
   .then((res) => res.json())
   .then((data) => data.status);