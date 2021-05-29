import { BrowserRouter as Router, Route, Switch,useLocation,Link,useHistory} from "react-router-dom";
import './App.css';
import {SignUp,Login,Profile} from './components'
import {ResetPassword} from './pages'
import {ResetPasswordConfirm} from './pages'
import {Activate} from './pages'
import {load_user,checkAuthenticated,googleAuthenticate} from './actions/auth'
import {useEffect,useState,useContext} from 'react'
import { connect } from 'react-redux';
import {Upload,ClassDiagram,Table,Buttons,Saved,Homepage,Help} from './pages'
import ClipLoader from "react-spinners/ClipLoader";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import PublishIcon from '@material-ui/icons/Publish';
import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import {Avatar} from '@material-ui/core'
import {logout,applyDark} from './actions/auth';
import { ThemeContext } from "./context/ThemeContext";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#ffffff',
    color:'#000',
    //width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    width: `calc(100% - ${theme.spacing(0) + 1}px)`,
    
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  darkBar: {
    background: '#6366F1',
    color:'#fff',
    //width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    width: `calc(100% - ${theme.spacing(0) + 1}px)`,
    
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    
    width: `calc(100% - ${drawerWidth}px)`,
    
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background:'#222A44',
    //background:'#4f46e5',
    
    
    color:'#ffffff',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background:'#222A44',
    //background:'#4f46e5',
    color:'#ffffff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
   //width: theme.spacing(7) + 1,
   width: theme.spacing(0) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    
    
    
  },

  title: {
    flexGrow: 1,
  },

  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop : '20px',
    marginBottom : '20px',
    fontSize: '60px',
    
  },
  small: {
    marginTop : '50px',
    marginBottom : '20px',
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  listItemText:{
    fontSize:'20px',
    
  }
}));


function App({checkAuthenticated,load_user,isAuthenticated,userdata,logout,applyDark}) {

    
    let history = useHistory()
    let location = useLocation()
    const [color, setColor] = useState("#000");
    const {darktheme, setdarkTheme} = useContext(ThemeContext);

  
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const darkThemeHandler = ()=>{
      applyDark(userdata.id,userdata.darktheme)
      setdarkTheme(userdata.darktheme === false ? "light" : "dark")
    }
    
  useEffect(() => {
    
        checkAuthenticated();
        load_user();
        
  }, [location,userdata?.darktheme]);

  const LogOutHandler = ()=>{
    logout()
    history.push("/login")
  }

  
  
  return (
    
    <div className="bg-gray-900">
    
    {isAuthenticated && 

    <div className="dashboard">
        {userdata?
      <div>
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx( userdata.darktheme?classes.appBar:classes.darkBar, {
          [classes.appBarShift]: open,
        })}
      >
    
        <Toolbar>
            
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap  className={classes.title}>
            SOFTARC 
          </Typography>


          {/*<Button color="inherit">Log Out</Button>*/}

            <div className="mid-area">
            <Typography variant="h6" noWrap 
            style={{marginRight:'10px'}}>
            Hi, {`${userdata.first_name} ${userdata.last_name}`}
            </Typography>
          <center>
          <Avatar src={userdata.image}>
          `${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`
             
          </Avatar>
          </center>
          </div>

        
              
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{fill: userdata.darktheme?"#121212":"#ffffff"}} /> : 
            <ChevronLeftIcon style={{fill:"#ffffff"}}/>}
          </IconButton>
        </div>
        <Divider style={{background:"#ffffff"}}/>

        <center>
          
          <Avatar className={open?classes.large:classes.small} src={userdata.image}>
          `${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`
              </Avatar>
          {open && <h4>{`${userdata.first_name} ${userdata.last_name}`}</h4>}
        </center>

        <Divider style={{background:"#ffffff"}}/>

        <List>
          <div className="hover:bg-indigo-500">
        <Link className="side-link-nav" to="/profile">  
        <ListItem button key={"Profile"}>
        <ListItemIcon><PersonIcon style={{fill:"#ffffff"}}/> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={"Profile"} />
        </ListItem>
        </Link>
        </div>

        <div className="hover:bg-indigo-500">
        <Link className="side-link-nav" to="/help">
        <ListItem button key={"Help"}>
        <ListItemIcon><HelpIcon style={{fill:"#ffffff"}}/> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={"Help"} />
        </ListItem>
        </Link>
        </div>

        <div className="hover:bg-indigo-500">
        <Link className="side-link-nav" to="/scanner">
        <ListItem button key={"Upload"}>
        <ListItemIcon><PublishIcon style={{fill:"#ffffff"}}/> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={"Upload"} />
        </ListItem>
        </Link>
        </div>
    
        </List>
        <Divider style={{background:"#ffffff"}}/>

        <List>
        <div className="hover:bg-indigo-500">
        <Link className="side-link-nav" to="/sv"> 
        <ListItem button key={"Saved"}>
        <ListItemIcon><SaveAltIcon style={{fill:"#ffffff"}} /> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={"Saved"} />
        </ListItem>
        </Link>
</div>

<div className="hover:bg-indigo-500">
        <ListItem button key={"Apply Dark Theme"} 
           onClick={() => darkThemeHandler()}>
        <ListItemIcon><InvertColorsIcon style={{fill:"#ffffff"}}/> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={userdata.darktheme?"Themeify Dark":"Themify Light"} />
        </ListItem>
        </div>

        <div className="hover:bg-indigo-500">
        <ListItem button key={"Log Out"} onClick={LogOutHandler}>
        <ListItemIcon><ExitToAppIcon style={{fill:"#ffffff"}}/> </ListItemIcon>
        <ListItemText classes={{primary:classes.listItemText}} primary={"Log Out"} />
        </ListItem>
        </div>
        </List>
      </Drawer>
      <main className="flex-grow h-full bg-gray-200 dark:bg-gray-600">
        <div className={classes.toolbar} />
        
        <Switch>
            <Route exact path='/profile' 
            component={() => <Profile darkmode={userdata.darktheme} userdata={userdata}
            imagename={`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
            /> } />

            <Route exact path='/scanner' component=
            {() => <Upload id={userdata.id}/> } />
            <Route exact path='/buttons' 
            component={() => <Buttons darkmode={userdata.darktheme} /> } />
            <Route exact path='/help' 
            component={() => <Help darkmode={userdata.darktheme} /> }  />

            <Route exact path='/cd' 
            component={() => <ClassDiagram darkmode={userdata.darktheme} id={userdata.id}/> } />

            <Route exact path='/sv'
            component={()=><Saved id={userdata.id}/>} />

            <Route exact path='/table' 
            component={()=><Table darkmode={userdata.darktheme} id={userdata.id}/>} />
            
           
          </Switch>
          
      </main>
    </div>
      </div>:
      <div className="Loading">
          <ClipLoader color={color}  size={150} /></div>}
      </div>
     }
     

      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
        <Route exact path='/activate/:uid/:token' component={Activate} />
      </Switch>
      
      
      </div>
      
   
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userdata: state.auth.user
});

export default connect(mapStateToProps, {checkAuthenticated,load_user,googleAuthenticate,logout,applyDark})(App)