import React from 'react'
import { Link,useHistory} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import PublishIcon from '@material-ui/icons/Publish';
import PersonIcon from '@material-ui/icons/Person';
import DP from './dp.jpg'
import './Sidebar.css'
import {SidebarOption} from '../../components'
import { connect } from 'react-redux';
import {logout} from '../../actions/auth'

function Sidebar({sidebar,fullname,setDarkmode,logout}) {
  let history = useHistory()

  const clickHandler = ()=>{
    logout()
    history.push("/login")
  }
  
  return (
        <div className={sidebar? `side-bar` : `show-side-bar`}>

        <center>
          <img className="dp" src={DP} />
          <h4>{fullname}</h4>
        </center>

        <SidebarOption Icon={HomeIcon} text="Home" sidebar={sidebar}/>
        <Link className="side-link" to="/profile">  
        <SidebarOption Icon={PersonIcon} text="Profile" sidebar={sidebar}/>
        </Link>
        <Link className="side-link" to="/scanner">  
        <SidebarOption Icon={PublishIcon} text="Upload" sidebar={sidebar}/>
        </Link>
        <Link className="side-link" to="/sv">    
        <SidebarOption Icon={SaveAltIcon} text="Saved" sidebar={sidebar}/>
        </Link>

        <div onClick={setDarkmode}>
        <SidebarOption Icon={InvertColorsIcon} text="Apply Dark Theme" sidebar={sidebar}/>
        </div>
        <div onClick={clickHandler}>
        <SidebarOption 
        Icon={ExitToAppIcon} text="Logout" sidebar={sidebar}/>
      </div>
            
        </div>

           

      
    )
}


export default connect(null, {logout})(Sidebar)
