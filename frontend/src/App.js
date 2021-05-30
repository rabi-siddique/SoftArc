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

          <div className="flex relative z-30 flex justify-center items-center px-4 md:pr-12">
                            <div className="px-2 flex flex-col items-center justify-center">
                                <svg className="w-25 h-25" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <g>
                                        <path
                                            fill={userdata.darktheme?"#000":"#fff"}
                                            d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                        />
                                    </g>
                                </svg>
                            </div>
          <Typography variant="h6" noWrap  className={classes.title}>
            SOFTARC 
          </Typography>

                        </div>

          <Typography variant="h6" noWrap  className={classes.title}>
            
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
            component={() => <ClassDiagram darkmode={userdata.darktheme} 
            email={userdata.email}
            id={userdata.id}/> } />

            <Route exact path='/sv'
            component={()=><Saved id={userdata.id}/>} />

            <Route exact path='/table' 
            component={()=><Table darkmode={userdata.darktheme} 
            email={userdata.email}
            id={userdata.id}/>} />
            
           
          </Switch>
          
      </main>
    </div>
      </div>:
      <div className="Loading">
          <ClipLoader color={color}  size={150} /></div>}
      </div>
     }
     

      <Switch>
        {!isAuthenticated && <Route exact path='/' component={Homepage} />}
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