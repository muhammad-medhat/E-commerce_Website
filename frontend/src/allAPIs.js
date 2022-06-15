

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
/**********************************************
 * Product functions
 *********************************************/

  /**
 * @desc    GET all Products
 * @route   GET /api/products/
 * @access  Public
 */ 
export const getProducts = () =>
fetch(`${api}/api/products`)
  .then((res) => res.json())
  .then((data) => data )


/**
 * @desc    GET single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = (id) =>
fetch(`${api}/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => data );
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
export const createProduct = ( { ...props } ) =>
fetch(`${api}/api/products`, {
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
 * @desc    Update product
 * @route   Put /api/products/:id
 * @access  Private
 */
export const updateProduct = ( { ...props } ) =>
fetch(`${api}/api/products/${props.id}`, {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify( { ...props } ),
})  
  .then((res) => res.json())
  .then((data) => data.status);

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
  .then((data) => data )

/**
 *  @desc    Get Brand products
 *  @route   GET /api/brand/:id/products
 *  @access  Public
 * */
export const getBrandProducts = (id) =>   
fetch(`${api}/api/brand/${id}/products`)
  .then((res) => res.json())
  .then((data) => data )


/**
 *  @desc    Get a Single Brand
 *  @route   GET /api/brand/:id
 *  @access  Public
 * */
export const getBrandById = (id) =>
fetch(`${api}/api/brand/${id}`)
  .then((res) => res.json())
  .then((data) => data )

/** admin functions 
 * ******************************************/

/**
 * @desc    Create Brand
 * @route   POST /api/brand/
 * @access  Private
 */
export const createBrand = ( { ...props } ) =>
fetch(`${api}/api/brand`, {
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
export const updateBrand = ( { ...props } ) =>
fetch(`${api}/api/brand/${props.id}`, {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify( { ...props } ),
})
  .then((res) => res.json())
  .then((data) => data.status);





