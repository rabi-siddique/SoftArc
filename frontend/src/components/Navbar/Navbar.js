import React from 'react'
import { Link,useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {Avatar,IconButton} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublishIcon from '@material-ui/icons/Publish';
import './Navbar.css'
import { connect } from 'react-redux';
import {logout} from '../../actions/auth'
import Logo3 from './SoftArcLogo223.jpg'
import Logo4 from './SoftArcLogo224.jpg'

function Navbar({showSidebar,darkmode,logout,
  imageurl,imagename,firstname,lastname}) {
  let history = useHistory()
  
  const clickHandler = ()=>{
    logout()
    history.push("/login")
  }
  const icon_color = darkmode?"#fff":"#121212"
  

  return (
    
      <div className="nav-header">

      <div className="left-area">
        <IconButton onClick={showSidebar}>
        <MenuIcon className="bar-btn" style={{fill: icon_color}}  />
        </IconButton>
        <img src={darkmode?Logo3:Logo4}/>
     
      </div>

      <div className="mid-area">
        <center>
          <Avatar src={imageurl}> {imagename}</Avatar>
          </center>
          <h1>Welcome {`${firstname} ${lastname}`}</h1>
      </div>

      <div className={darkmode?"right-area-dark":"right-area-light"}>

              <Link className="nav-link" to={`/scanner`}>
                <IconButton>
                <PublishIcon style={{fill: icon_color}}/>
                <h1 className="upload-label" >Upload</h1>
                </IconButton>
                </Link>
              
          
              <IconButton onClick={clickHandler}>
              <ExitToAppIcon color="secondary" style={{fill: icon_color}}/>
              <h1 className="logout-label">LogOut</h1>
              </IconButton>
              
              

      </div>


      </div>

      
      
      
    
  )
}

export default connect(null, {logout})(Navbar)
