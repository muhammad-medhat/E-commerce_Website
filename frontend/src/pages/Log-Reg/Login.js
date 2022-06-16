

import { useState } from "react";
import * as allAPIs from "./../../allAPIs";
import "./login.css";

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [Button, setButton] = useState("Sign In");
    const [userData, setUserData] = useState( [] ) ;
    const [errorMessage, setErrorMessage] = useState(false);

    const switchPage = () => {
        setNewUser(!newUser);
        if(!newUser) {setButton("Create Account")}
        else {setButton("Sign In")}
    };

    const logInFunc = (logInRes)=> {

      localStorage.setItem("token", logInRes.token);
      localStorage.setItem("state", true);
       window.location.replace("http://localhost:3000/profile");
    }

    const onChangeHandle = (event) => {
      if(errorMessage === true) { setErrorMessage(false) }
      
      const {name, value} = event.target;
      userData[name] = value ;
      
      setUserData(userData);
    }

    const onSubmitHandle = (event) => {
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
          email:    userData[0],
          password: userData[1],
        }
        
      // set login and register post here
      const postLogin = async ()=> {
        const res = newUser? await allAPIs.register(info) : await await allAPIs.login(info);
        console.log(res)
        res.status === 201 ?  window.location.replace("http://localhost:3000/login")
        : res.status === 200? logInFunc(res) : setErrorMessage(true)
      };
      postLogin();
    };
    
return (
  <div className="bg-light row log-reg-box">
    <div className="col-4 info-box log-reg-container">
      <h2>{Button}</h2>
      
      <div className="info-box">
        {errorMessage && <h6 className="error-message" >error</h6> }

        <form className="info-box" onSubmit={onSubmitHandle}  >
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



