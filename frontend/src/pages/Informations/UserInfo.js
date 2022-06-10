import React from 'react';
import { Aside } from '../../components';
import './UserInfo.css';
import {Form, Button } from 'react-bootstrap';
//import { useDispatch, useSelector } from 'react-redux'


const UserInfo = () => {

  return (
      
    <div className='UserInfo_wrapper'>
                <Aside />
                <div className='UserInfo_wrapper-content d-flex w-100 p-5'>
                    <h1 className='mb-5'>My Information</h1>
                    <div className="UserInfo_wrapper-content_items w-75">
                        <div className="UserInfo_wrapper-content_items mb-5">
                        <div className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="Username" placeholder="Enter your Username" defaultValue="{username}" /*onChange={(e) => this.setName(e.target.value)} */required />
                        </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                        <div className="mb-3">
                             <Form.Label>Location</Form.Label>
                             <Form.Control type="Location" placeholder="Enter your Location" defaultValue="{address}" /*onChange={(e) => this.setAddress(e.target.value)}*/ required />
                            </div>
                        </div>
                        <div className="UserInfo_wrapper-content_items mb-5">
                        <div className="mb-3">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control type="email" placeholder="Enter your email address" aria-label="Disabled input" defaultValue="{email}"/* onChange={(e) => this.setEmail(e.target.value)}*/ disabled readOnly />
                        </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                             <Form.Label>Phone number</Form.Label>
                             <Form.Control type="tel" placeholder="Enter your phone number" defaultValue="{phone}" /*onChange={(e) => this.setPhone(e.target.value)}*/  required />
                            </div>
                            <div className="col-md-6">
                             <Form.Label>Birthday</Form.Label>
                             <Form.Control type="age" placeholder="Enter your birthday" defaultValue="{age}" /*onChange={(e) => this.setAge(e.target.value)}*/ disabled readOnly/>
                            </div>
                        </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                        <div className="mb-3">
                             <Form.Label>Password</Form.Label>
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

export default UserInfo;