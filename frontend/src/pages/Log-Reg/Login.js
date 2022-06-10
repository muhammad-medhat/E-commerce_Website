
import { useState } from "react";
import "./login.css";

const api = 'http://localhost:3001';

const headers = {
	Accept: "application/json",
  };
  
  const login = (email, password) =>
  fetch(`${api}/api/users/login`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => data);
  
  const register = ( email, password, username, phone, address, age ) =>
  fetch(`${api}/api/users/register`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username, phone, address, age }),
  })
    .then((res) => res.json())
    .then((data) => data);


const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [Button, setButton] = useState("Sign In");
    const [userData, setUserData] = useState( [] ) ;

    const switchPage = () => {
        setNewUser(!newUser);
        if(!newUser) {setButton("Create Account")}
        else {setButton("Sign In")}
    }

    const onChangeHandle = (event) => {
      const {name, value} = event.target;
      userData[name] = value ;
      
      setUserData(userData);
    }

    const onSubitHandle = (event) => {
        event.preventDefault();
        console.log("userData",userData);

        let info = newUser? {
          email:    userData[0],
          password: userData[1],
          username: userData[2],
          phone:    userData[3],
          address:  userData[4],
          age:      userData[5],
        } : {
          age: userData[2],
          password: userData[1],
        }
      // set login and register post here
      const postLogin = async ()=> {
        console.log(info)
        const res = newUser? await register(info) : await await login(info);
        console.log(res);
      };
      postLogin();
    };
    
return (
  <div className="bg-light row log-reg-box">
    <div className="col-4 info-box log-reg-container">
      <h2>{Button}</h2>
      
      <div className="info-box">
        <form className="info-box" onSubmit={onSubitHandle}>
          <input
          type="email"
          placeholder="email"
          name="0"
          value={userData[0]}
          onChange={onChangeHandle}
          />
          <input
          type="password"
          placeholder="password"
          name="1"
          value={userData[1]}
          onChange={onChangeHandle}
          />
          
          { newUser && 
          <div>
            <input
              type="text"
              placeholder="userName"
              name="2"
              value={userData[2]}
              onChange={onChangeHandle}
            />
            <input
              type="number"
              placeholder="phone"
              name="3"
              value={userData[3]}
              onChange={onChangeHandle}
            />
            <input
              type="text"
              placeholder="address"
              name="4"
              value={userData[4]}
              onChange={onChangeHandle}
            />
            <input
              type="number"
              placeholder="age"
              name="5"
              value={userData[5]}
              onChange={onChangeHandle}
            />
          </div> }

          <div>
            <button className="btn btn-primary">{Button}</button>
          </div>
        </form>

        <button 
        className="switching-Button" 
        onClick={switchPage}>
          {(newUser && "Sign In")||(!newUser && "Create Account")}
        </button>
      </div>
    </div>

    <div className="col-4 side-img"></div>
      
  </div> 
)};

export default Login;



