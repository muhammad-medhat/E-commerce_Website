import { Aside } from '../../components';
import './UserInfo.css';
import {Form, Button } from 'react-bootstrap';
import React ,{ useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux'

const Security = () => {
    
    const token = localStorage.getItem("token");
  
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/api/users/`, {
            headers: {'Authorization': `Bearer ${token}`
            }
          })
        .then(res => res.json())
        .then(data => setUser(data));
    }, [])


    
    return (
        <div className='UserInfo_wrapper'>
            <Aside />
            <div className='UserInfo_wrapper-content d-flex w-100 p-5'>
                <h1 className='mb-5'>My security</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                   
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" aria-label="Disabled input" defaultValue={user.email}/* onChange={(e) => this.setEmail(e.target.value)}*/  required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" defaultValue="{password}" /*onChange={(e) => this.setPassword(e.target.value)} controlId="formPlaintextPassword"*/ required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" defaultValue="{password}" /*onChange={(e) => this.setPassword(e.target.value)} controlId="formPlaintextPassword"*/ required />
                    </div>
                    </div>

                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" defaultValue="{password}" /*onChange={(e) => this.setPassword(e.target.value)} controlId="formPlaintextPassword"*/ required />
                    </div>
                    </div>
                    <div className="UserInfo_wrapper-content_items mb-5">
                    <div className="action-wrapper text-center">
                    <Button className="btn"  type="submit">Save changes</Button>
                    </div>
                    </div>
            
                </div>
            </div>
        </div>
    )
}

export default Security;