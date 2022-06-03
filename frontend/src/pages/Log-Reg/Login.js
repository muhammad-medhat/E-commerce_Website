
import { useState } from "react";
import "./login.css";

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [Button, setButton] = useState("Create Account");

    const switchPage = () => {
        setNewUser(!newUser);
        if(newUser) {setButton("Create Account")}
        else {setButton("Sign In")}
    }

    const onSubitHandle = (event) => {
        event.preventDefault();
        console.log("submitted")
    };

return (
  <div className="container-fluid bg-light row log-reg-box">
    <div className="col-5 info-box log-reg-container">
      <h2>{Button}</h2>
       
      <div className="info-box">
        <form className="info-box" onSubmit={onSubitHandle}>
          {
          newUser && 
          <input
          type="text"
          placeholder="name"
          />
          }
          <input
          type="text"
          placeholder="email"
          />
          <input
          type="text"
          placeholder="password"
          />
          <div>
            <button className="btn btn-primary">{Button}</button>
          </div>
        </form>

        <button 
        className="switching-Button" 
        onClick={switchPage}>
          {(!newUser && "Sign In")||(newUser && "Create Account")}
        </button>
      </div>
    </div>

    <div className="col-5 side-img"></div>
      
  </div> 
)};

export default Login;


