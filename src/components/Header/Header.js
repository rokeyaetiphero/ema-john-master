import React, { useContext } from 'react';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import '../Header/Header.css'
const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                <button onClick={() =>setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;