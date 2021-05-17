import React from 'react'
import './Homepage.css'
import Logo from './SoftArcLogo.jpg'
import {Link} from 'react-router-dom'

function Homepage() {
    return (
        <div className="home-container">
            <div className="home-nav">
                <img src={Logo}/>
                <Link to="/login">
                <button>
                    Sign In
                </button>
                </Link>
            </div>

            
            <div className="home-mid-text">

                <ul>
                <li><h1>  Welcome to SoftArc !</h1></li>
                <li><p>If you're new here. Lets get started by creating an
                account.</p></li>
                <li>

                <Link to="/signup">
                <button>
                    Sign Up
                </button>
                </Link>

                </li> 

                </ul>
                 
            </div>
            
            
        </div>
    )
}

export default Homepage
