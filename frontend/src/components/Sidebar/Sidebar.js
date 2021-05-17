import React from 'react'
import { Link,useHistory} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import PublishIcon from '@material-ui/icons/Publish';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import './Sidebar.css'
import {SidebarOption} from '../../components'
import { connect } from 'react-redux';
import {logout} from '../../actions/auth'
import {Avatar,IconButton} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop : '20px',
    marginBottom : '20px',
    fontSize: '60px',
    
  },
  
}));


function Sidebar({sidebar,fullname,setDarkmode,logout,imageurl,
  imagename,firstname,lastname}) {
  let history = useHistory()
  const classes = useStyles();
  
  const clickHandler = ()=>{
    logout()
    history.push("/login")
  }
  
  return (
        <div className={sidebar? `side-bar` : `show-side-bar`}>

        <center>
          
          <Avatar className={classes.large} src={imageurl}>{imagename}</Avatar>
          <h4>{`${firstname} ${lastname}`}</h4>
        </center>

        <Link className="side-link" to="/profile">  
        <SidebarOption Icon={PersonIcon} text="Profile" sidebar={sidebar}/>
        </Link>
        <Link className="side-link" to="/help">
        <SidebarOption Icon={HelpIcon} text="Help" sidebar={sidebar}/>
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
