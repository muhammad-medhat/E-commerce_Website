import React from 'react'
import { NavLink } from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';
import {MdOutlineDeliveryDining} from 'react-icons/md';
import {FaQuestionCircle} from 'react-icons/fa';
import './aside.css'
const Aside = () => {
    return (
        <aside className='d-flex justify-content-center align-items-center'>
            <ul className='aside_links list-unstyled'>
                <NavLink className="mb-5" to="/profile">
                    <AiOutlineUser />
                    <li>My Account</li>
                </NavLink>
                <NavLink className="mb-5" to="/orders">
                    <MdOutlineDeliveryDining />
                    <li>My Orders</li>
                </NavLink>
                <NavLink to="/faqs">
                    <FaQuestionCircle />
                    <li>FAQS</li>
                </NavLink>
            </ul>
        </aside>
    )
}

export default Aside;