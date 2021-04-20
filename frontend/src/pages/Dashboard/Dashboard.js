import React,{useState,useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import {Navbar} from '../../components'
import {Sidebar} from '../../components'
import { connect } from 'react-redux';
import { logout,checkAuthenticated, load_user } from '../../actions/auth';


function Dashboard({logout,checkAuthenticated, load_user}) {

    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
        if (redirect) {
            return <Redirect to='/' />
        }
    };

    const [sidebar,setSidebar] = useState(true)
    const showSidebar = ()=> {setSidebar(!sidebar)}

        useEffect(() => {
            checkAuthenticated();
            load_user();
        }, []);
    
  
    return (
        <div>
            <Navbar showSidebar={showSidebar} logout_user={logout_user}/>
            <Sidebar sidebar={sidebar} logout_user={logout_user}/>
        </div>
    )
}

export default connect(null, {logout, checkAuthenticated, load_user })(Dashboard)
