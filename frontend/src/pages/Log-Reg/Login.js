import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../../features/slice/auth/authSlice'
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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
        email,
        password,
      }

      dispatch(login(userData))
  }
  const switchPage = () => {
    navigate('/register')
};
  
return (
<div className="bg-light row log-reg-box">
<div className="col-4 info-box log-reg-container">
  <h2>   Sign In   </h2>
  
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
        <button className="btn btn-primary">   Sign In   </button>
      </div>
    </form>
    
    <button 
    className="switching-Button" 
     onClick={switchPage} >
       Create Account
    </button>
  </div>
</div>

<div className="col-4 side-img"></div>
  
</div> 
)
}
export default Login;



