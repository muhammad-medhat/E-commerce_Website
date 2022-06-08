import React, { useState, useEffect } from 'react';
import { Aside } from '../../components';
import './UserInfo.css';
import {Form,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'


const UserInfo = ({ history }) => {

	/*
    const [ username,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [age,setAge] = useState('')
    const [ address,setAddress] = useState('')
    const [ phone,setPhone] = useState('')

    const dispatch = useDispatch()

    // Make sure user is logged in to access this page
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

   // useSelector is to grab what we want from the state
	const userDetails = useSelector((state) => state.userDetails)
	const { user } = userDetails

    // Get success value from userUpdateProfileReducer
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

    // make request here upon component load
	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login')
			} else {
				if (!user || !user.name || success) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET })
					dispatch(getUserDetails('user'))
				} else {
					setName(user.name)
					setEmail(user.email)
				}
			}
		},
		[dispatch, history, userInfo, user, success] // Dependencies, on change they fire off useEffect
	)

    const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUserProfile({ id: user._id, username, email, password,age, address,phone }))
	}*/

    

  return (
      
     <div className="UserInfo">
             <Aside/>
      <div className="page-xl px-4 mt-4">
        <div className="row">
            <div className="card mb-4">
                <div className="card-body">
                    <Form onSubmit={submitHandler} className="needs-validation" novalidate>
                     <h2 class="text-center">My Information</h2>
                   
                        <div class="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="Username" placeholder="Enter your Username" defaultValue="{username}" /*onChange={(e) => this.setName(e.target.value)} */required />
                        </div>

                            <div className="mb-3">
                             <Form.Label>Location</Form.Label>
                             <Form.Control type="Location" placeholder="Enter your Location" defaultValue={address} onChange={(e) => this.setAddress(e.target.value)} required />
                            </div>

                        <div className="mb-3">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control type="email" placeholder="Enter your email address" aria-label="Disabled input" defaultValue={email} onChange={(e) => this.setEmail(e.target.value)} disabled readOnly />
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                             <Form.Label>Phone number</Form.Label>
                             <Form.Control type="tel" placeholder="Enter your phone number" defaultValue={phone} onChange={(e) => this.setPhone(e.target.value)}  required />
                            </div>
                            <div className="col-md-6">
                             <Form.Label>Birthday</Form.Label>
                             <Form.Control type="age" placeholder="Enter your birthday" defaultValue={age} onChange={(e) => this.setAge(e.target.value)} disabled readOnly/>
                            </div>
                        </div>
                        <div className="mb-3">
                             <Form.Label>Password</Form.Label>
                             <Form.Control type="password" placeholder="Password" defaultValue={password} onChange={(e) => this.setPassword(e.target.value)} controlId="formPlaintextPassword" required />
                        </div>

                        <div className="action-wrapper text-center">
                        <Button className="btn"  type="submit">Save changes</Button>
                        </div>
                    </Form>
                </div>
            </div>
         </div>
      </div>
    </div>
    
  )
}

export default UserInfo;