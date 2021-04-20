import React from 'react'
import { Redirect } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import PublishIcon from '@material-ui/icons/Publish';
import DP from './dp.jpg'
import './Sidebar.css'

function Sidebar(props) {

  return (
        <div className={props.sidebar? `side-bar` : `show-side-bar`}>

        <center>
          <img className="dp" src={DP} />
          <h4>Rabi Siddique</h4>
        </center>

        <div className="sidebar-content">
          
            <div className="item">
            <HomeIcon className="icon"/>
            <span className="item-text">Home</span>
            </div>

        
            <div className="item">
            <DashboardIcon className="icon"/>
            <span className="item-text">Dashboard</span>
            </div>

           
            <div className="item">
            <SaveAltIcon className="icon"/>
            <span className="item-text">Saved</span>
            </div>

            
            <div className="item">
            <PublishIcon className="icon"/>
            <span className="item-text">Upload</span>
            </div>

            
            <div className="item">
            <SettingsIcon className="icon"/>
            <span className="item-text">Settings</span>
            </div>
            
            
            <div className="item">
            <InvertColorsIcon className="icon"/>
            <span className="item-text">Apply Dark Theme</span>
            </div>

           
            <div className="item" onClick={props.logout_user}>
            <ExitToAppIcon className="icon"/>
            <span className="item-text">LogOut</span>
            </div>
        </div>

           

      </div>
    )
}

export default Sidebar
