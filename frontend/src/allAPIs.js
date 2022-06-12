

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
  .then((data) => data.status);

   /*SEARCH GETALL */
export const getAllProducts = () =>
fetch(`${api}/api/products`)
  .then((res) => res.json())
  .then((data) => data )