import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

export default function Menu() {

    const [{ username }] = useState(JSON.parse(localStorage.getItem("user")) || [])

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }



    return (
        <aside className="menu p-4 has-text-centered" style={{ height: '1000px' }}
        >
            <Link to={"/"} className="title is-size-3 ">
                Online store
            </Link>

            <div className="menu-label  has-text-weight-bold my-5 is-size-5">
                <FaRegUserCircle /> <br />
                {username ? username : "Anonymouse User"}
            </div>
            <div className="menu-label ">
                Menu
            </div>
            <ul className="menu-list ">
                <li>
                    <FaCartPlus />
                    <Link style={{ "display": 'inline-block' }} to={"/cart"}>Cart</Link>
                </li>
                <li>
                    <FaShoppingBasket />
                    <a style={{ "display": 'inline-block' }}>Orders</a>
                </li>
                <li>
                    <IoLogOutOutline />
                    <a onClick={logOut} style={{ "display": 'inline-block' }} className='has-text-danger'>Log out</a>
                </li>

            </ul>
        </aside>
    );
}


