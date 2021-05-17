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
import axios from 'axios'
import queryString from 'query-string'


function App({checkAuthenticated,load_user,isAuthenticated,userdata,googleAuthenticate}) {

    let location = useLocation()
    const [darkmode,setDarkmode] = useState(false);
    const [sidebar,setSidebar] = useState(true)
    const [profiledata,setprofiledata] = useState({})
    const [imageurl,setimageurl] = useState("")
    const [firstname,setfirstname] = useState("")
    const [lastname,setlastname] = useState("")
    
  
    const showSidebar = ()=> {setSidebar(!sidebar)}
    

    const applyDark = () => {

      let url1 = `http://127.0.0.1:8000/profile/update/${userdata?.id}/`;

        async function setDarkTheme(){
        
          const resp = await axios.patch(url1,{"darktheme":!darkmode})
          setDarkmode(!darkmode)
             
      } 
      
      setDarkTheme()
      
    }

    
  
  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

    if (state && code) {
        console.log("try google")
        googleAuthenticate(state, code);
    }
  else{
        checkAuthenticated();
        load_user();
  }
      
      
  }, [location]);

  

  useEffect(()=>{
    if (isAuthenticated){
      let url1 = `http://127.0.0.1:8000/profile/get/${userdata?.id}/`;

      async function getDarkTheme(){
      
        const resp = await axios.get(url1)
        setDarkmode(resp.data.darktheme)           
    } 
    
    
      async function fetchData(){
  
      const resp = await axios.get(url1)
      setprofiledata(resp.data)
      setfirstname(profiledata.first_name)
      setlastname(profiledata.last_name)
      setimageurl(`${process.env.REACT_APP_API_URL}${profiledata.image}`)
                
  }  
      fetchData()
      getDarkTheme()

    }
  },[imageurl,darkmode])

  
  
  return (
    
    
<Router>
    {isAuthenticated && 

    <div className={darkmode?"darkmode":"light"}>
        {userdata && profiledata?
          <div>
        <Navbar showSidebar={showSidebar}
        firstname={firstname}
        lastname={lastname}
        imageurl = {imageurl}
        imagename = {`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
        darkmode={darkmode}/>

        <div className="dashboard">

            <Sidebar sidebar={sidebar}
            firstname={firstname}
            lastname={lastname}
            imageurl = {imageurl}
            imagename = {`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
            setDarkmode={applyDark}/>

            <Switch>
            <Route exact path='/profile' 
            component={() => <Profile darkmode={darkmode} userdata={userdata}
            firstname = {firstname}
            lastname = {lastname}
            setfirstname={setfirstname}
            setlastname={setlastname}
            data={profiledata} 
            setimageurl={setimageurl}
            imageurl={imageurl}
            imagename={`${userdata.first_name.slice(0,1)}${userdata.last_name.slice(0,1)}`}
            /> } />

            <Route exact path='/scanner' component={Upload} />
            <Route exact path='/buttons' component={Buttons} />
            <Route exact path='/help' component={Help} />

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

