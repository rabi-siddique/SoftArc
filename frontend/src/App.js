import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {SignUp,Login,Sidebar,Navbar,Profile} from './components'
import {ResetPassword} from './pages'
import {ResetPasswordConfirm} from './pages'
import {Activate} from './pages'
import {load_user,checkAuthenticated} from './actions/auth'
import {useEffect,useState} from 'react'
import { connect } from 'react-redux';
import {Upload,ClassDiagram,Table,Buttons,Saved} from './pages'
import axios from 'axios'


function App({checkAuthenticated,load_user,isAuthenticated,userdata}) {

    
    const [darkmode,setDarkmode] = useState(false);
    const [sidebar,setSidebar] = useState(true)
    
  
    const showSidebar = ()=> {setSidebar(!sidebar)}
    

    const applyDark = () => {

      let url = `http://127.0.0.1:8000/profile/update/${userdata?.id}/`;

        async function setDarkTheme(){
        
          const resp = await axios.patch(url,{"darktheme":!darkmode})
          setDarkmode(!darkmode)
             
      } 
      
      setDarkTheme()
      
    }

    
  
  useEffect(() => {

        checkAuthenticated();
        load_user();
      
      
  }, []);

  

  useEffect(()=>{
    if (isAuthenticated){
      let url = `http://127.0.0.1:8000/profile/get/${userdata?.id}/`;

      async function getDarkTheme(){
      
        const resp = await axios.get(url)
        setDarkmode(resp.data.darktheme)           
    }  

        getDarkTheme()
    }
  })

  
  
  return (
    
    
<Router>
    {isAuthenticated && 

    <div className={darkmode?"darkmode":"light"}>
        {userdata?
          <div>
        <Navbar showSidebar={showSidebar}
        fullname={userdata.fullname} 
        darkmode={darkmode}/>

        <div className="dashboard">

            <Sidebar sidebar={sidebar}
            fullname={userdata.fullname}
            setDarkmode={applyDark}/>
            <Switch>
            <Route exact path='/profile' 
            component={() => <Profile darkmode={darkmode} userdata={userdata}/> } />

            <Route exact path='/scanner' component={Upload} />
            <Route exact path='/buttons' component={Buttons} />

            <Route exact path='/cd' 
            component={() => <ClassDiagram darkmode={darkmode} id={userdata.id}/> } />

            <Route exact path='/sv'
            component={()=><Saved id={userdata.id}/>} />

            <Route exact path='/table' 
            component={()=><Table darkmode={darkmode} id={userdata.id}/>} />
            
           
          </Switch>
      </div>
      </div>:<h1>Loading</h1>}
      </div>
     }
     

      <Switch>
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

export default connect(mapStateToProps, {checkAuthenticated,load_user})(App)

