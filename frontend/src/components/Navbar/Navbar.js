import React from 'react'
import { Redirect } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import {Avatar,IconButton} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublishIcon from '@material-ui/icons/Publish';
import './Navbar.css'


function Navbar(props) {

  return (
    
      <div className="header">

      <div className="left-area">
        <IconButton onClick={props.showSidebar}>
        <MenuIcon className="bar-btn" />
        </IconButton>
        <h1>SOFTARC</h1>
     
      </div>

      <div className="mid-area">
        <center>
          <Avatar/>
          </center>
          <h1>Welcome Rabi Siddique</h1>
      </div>

      <div className="right-area">

              <IconButton>
                  <AppsIcon />
              </IconButton>
            
              
                <IconButton>
                <PublishIcon />
                <h1 className="upload-label">Upload</h1>
                </IconButton>
              
            

              
              <IconButton onClick={props.logout_user}>
              <ExitToAppIcon />
              <h1 className="logout-label">LogOut</h1>
              </IconButton>
              
              

      </div>


      </div>

      
      
      
    
  )
}

export default Navbar
