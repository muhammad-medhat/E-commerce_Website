import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';
import {MdOutlineDeliveryDining} from 'react-icons/md';
import {FaQuestionCircle} from 'react-icons/fa';
import {BiChevronDown} from  'react-icons/bi';
import {BiLogOut}from 'react-icons/bi';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {useDispatch} from 'react-redux'
import {logout, reset} from '../../features/slice/auth/authSlice'

import './aside.css'

const Accordion = styled((props) => (

    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({

    backgroundColor:
    theme.palette.mode === 
      'rgba(255, 255, 255, .05)'
     
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      {...props}
    />
  ))(({ theme }) => ({}));
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  
  }));
  
const Aside = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

 const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
   };


  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

    return (
        <aside className='d-flex justify-content-center align-items-center'>
            <ul className='aside_links list-unstyled'>
                <Accordion className="Accordion" onChange={handleChange('panel1')}>
                    <AccordionSummary >
                    <NavLink className="mb-5" to="/profile"> <Typography >  <AiOutlineUser /><li className="down">My Account</li> <BiChevronDown/></Typography> </NavLink>  
                        </AccordionSummary>
                         <AccordionDetails>
                            <Typography>
                             <NavLink className="mb-5" to="/profile/security">
                                security</NavLink>  
                                <NavLink className="mb-5" to="/profile/paymentmethods">
                                payment methods</NavLink>
                            </Typography>
                        </AccordionDetails>
                        </Accordion>
                <NavLink className="mb-5" to="/orders">
                    <MdOutlineDeliveryDining />
                    <li>My Orders</li>
                </NavLink>
                <NavLink className="mb-5" to="/faqs">
                    <FaQuestionCircle />
                    <li>FAQS</li>
                </NavLink>

                <NavLink onClick={onLogout}  className="mb-5" to="/">
                    <BiLogOut />
                    <li>Logout</li>
                </NavLink>
            </ul>
        </aside>
    )
}

export default Aside;