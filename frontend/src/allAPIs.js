

const api = 'http://localhost:3001';

const headers = {
	Accept: "application/json",
  };

  /* USER LOGIN - REGISTER - LOGOUT */
export const register = ( { ...props } ) =>
fetch(`${api}/api/users/register`, {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify( { ...props } ),
})
  .then((res) => res.json())
  .then((data) => data.status);


export const login = ({...props}) =>
fetch(`${api}/api/users/login`, {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...props}),
})
  .then((res) => res.json())
  .then((data) => data);

   /*SEARCH GETALL */
export const getAllProducts = () =>
fetch(`${api}/api/products`)
  .then((res) => res.json())
  .then((data) => data )

  /***************************************************
   * Category functions
   ***************************************************/

  /**
   * @desc    get all Category
   * @route   GET /api/categories/
   * @access  Public
   */
export const getCategories = () =>
fetch(`${api}/api/categories`)
  .then((res) => res.json())
  .then((data) => data )

  /**
   * @desc    Get category products
   * @route   GET /api/categories/:id/products
   * @access  Public 
   */
export const getCategoryProducts = (id) =>
fetch(`${api}/api/categories/${id}/products`)
  .then((res) => res.json())
  .then((data) => data )

  /*************** Admin functions *********** */
  //NOTE: Admin functions are not tested in the frontend
  /**
   * @desc    Create Category
   * @route   POST /api/categories/
   * @access  Private
   */
export const createCategory = ( { ...props } ) =>
fetch(`${api}/api/categories`, {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify( { ...props } ),
})
  .then((res) => res.json())
  .then((data) => data.status);

/**
 * @desc    update Category
 * @route   PUT /api/categories/:id
 * @access  Private
 */
export const updateCategory = ( { ...props } ) =>
fetch(`${api}/api/categories/${props.id}`, {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify( { ...props } ),
})
  .then((res) => res.json())
  .then((data) => data.status);

/**
 * @desc    Delete Category
 * @route   DELETE /api/categories/:id
 * @access  Private
 */
export const deleteCategory = (id) =>
fetch(`${api}/api/categories/${id}`, {
  method: "DELETE",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => data.status);
  /********************************************************************* */

  /* GET PRODUCT BY ID */
export const getProductById = (id) =>
fetch(`${api}/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => data );
