import { BrowserRouter as Router, Route, Switch,useLocation} from "react-router-dom";
import './App.css';
import {SignUp,Login,Sidebar,Navbar,Profile} from './components'
import {ResetPassword} from './pages'
import {ResetPasswordConfirm} from './pages'
import {Activate} from './pages'
import {load_user,checkAuthenticated,googleAuthenticate} from './actions/auth'
import {useEffect,useState} from 'react'
import { connect } from 'react-redux';
import {Upload,ClassDiagram,Table,Buttons,Saved,Homepage,Help} from './pages'

function App({checkAuthenticated,load_user,isAuthenticated,userdata}) {

    let location = useLocation()
    const [sidebar,setSidebar] = useState(true)
    const showSidebar = ()=> {setSidebar(!sidebar)}
    
  useEffect(() => {
    
        checkAuthenticated();
        load_user();
        
  }, [location,userdata?.darktheme]);

  
  
  return (
    
    
<Router>
    {isAuthenticated && 

    <div>
        {userdata?
      <div className={userdata.darktheme?"darkmode":"light"}>
        <Navbar showSidebar={showSidebar}
        firstname={userdata.first_name}
        lastname={userdata.last_name}
        imageurl = {userdata.image}
        imagename = {`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
        darkmode={userdata.darktheme}/>

        <div className="dashboard">

            <Sidebar sidebar={sidebar}
            firstname={userdata.first_name}
            lastname={userdata.last_name}
            imageurl = {userdata.image}
            imagename = {`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
            userdata = {userdata}
            />

            <Switch>
            <Route exact path='/profile' 
            component={() => <Profile darkmode={userdata.darktheme} userdata={userdata}
            imagename={`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
            /> } />

            <Route exact path='/scanner' component={Upload} />
            <Route exact path='/buttons' component={Buttons} />
            <Route exact path='/help' component={Help} />

            <Route exact path='/cd' 
            component={() => <ClassDiagram darkmode={userdata.darktheme} id={userdata.id}/> } />

            <Route exact path='/sv'
            component={()=><Saved id={userdata.id}/>} />

            <Route exact path='/table' 
            component={()=><Table darkmode={userdata.darktheme} id={userdata.id}/>} />
            
           
          </Switch>
      </div>
      </div>:<h1>Loading</h1>}
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
      
      
    
      </Router>
   
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userdata: state.auth.user
});

export default connect(mapStateToProps, {checkAuthenticated,load_user,googleAuthenticate})(App)

