import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../../features/slice/auth/authSlice'
import "./login.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        age: '',
      })
    
      const {  username , email, password, phone, address, age } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()

          const userData = {
            username,
            email,
            password,
            phone,
            address, 
            age,
          }
    
          dispatch(register(userData))
      }
      const switchPage = () => {
        navigate('/login')
    };
      
  return (
    <div className="bg-light row log-reg-box">
    <div className="col-4 info-box log-reg-container">
      <h2>Create Account</h2>
      
      <div className="info-box">
        <form className="info-box" onSubmit={onSubmit}  >
        <input required
          id="email"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
          />
          <input required
          id="password"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
          />
          <div>
            <input required
              id="username"
              type="text"
              placeholder="User Name"
              name="username"
              value={username}
              onChange={onChange}
            />
            <input
              id="phone"
              type="number"
              placeholder="phone"
              name="phone"
              value={phone}
              onChange={onChange}
            />
            <input
              id="address"
              type="text"
              placeholder="address"
              name="address"
              value={address}
              onChange={onChange}
            />
            <input
              id="age"
              type="number"
              placeholder="age"
              name="age"
              value={age}
              onChange={onChange}
            />
          </div> 

          <div>
            <button className="btn btn-primary">Create Account</button>
          </div>
        </form>
        
        <button 
        className="switching-Button" 
         onClick={switchPage} >
            Sign In   
        </button>
      </div>
    </div>

    <div className="col-4 side-img"></div>
      
  </div> 
  )
}

export default Register
