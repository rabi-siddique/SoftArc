import React,{useState,useEffect} from 'react'
import './Profile.css'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {Avatar,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {changeFirstName,changeLastName,changeDP,
    changeUsername,changeAbout} from '../../actions/auth'


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop : '20px',
    marginBottom : '20px',
    fontSize: '60px',
    
  },
  
}));

function Profile({imagename,userdata,changeFirstName,changeLastName,
    changeUsername,changeAbout,changeDP}) {
    const classes = useStyles();
    const [namefield,setNameField] = useState(false)
    const [namefield2,setNameField2] = useState(false)
    const [usernamefield,setUsernameField] = useState(false)
    const [aboutfield,setAboutField] = useState(false)
    const [fname,setfName] = useState("")
    const [lname,setlname] = useState("")
    const [username,setUserName] = useState("")
    const [about,setAbout] = useState("")
    const [selectedFile,setSelectedFile] = useState()
    const config = {headers:{"content-type":"multipart/form-data",accept:'application/json'}}
    
    
    const onChangeName = ()=>{
        
        changeFirstName(userdata.id,fname)
        setNameField(false)
    }

    const onChangelname = ()=>{
        changeLastName(userdata.id,lname)
        setNameField2(false)
    }

    const onChangeUsername = ()=>{
        changeUsername(userdata.id,username)
        setUsernameField(false)
    }

    const onChangeAbout = ()=>{
        
        changeAbout(userdata.id,about)
        setAboutField(false)
    }

    
    const clickHandlerA = ()=>{
        setNameField(!namefield)
    }

    const clickHandlerD = ()=>{
        setNameField2(!namefield2)
    }

    const clickHandlerB = ()=>{
        setUsernameField(!usernamefield)
    }
    const clickHandlerC = ()=>{
        setAboutField(!aboutfield)
    }

   
    const onClickHandler = (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const data = new FormData()
        data.append("image",selectedFile,selectedFile.name)
        console.log(data)
        changeDP(userdata.id,data)
        
    }


    if(userdata){

    return (
        <div className="profile">
            <div className="profile-banner">
               <h1> Welcome to your Profile !</h1>
            </div>
            
  
             <div className="profile-picture">
    
             <Avatar className={classes.large} 
             src={userdata.image}>
                 {imagename}</Avatar>
          
            
             <form method="patch" encType="multipart/formdata" 
                onSubmit={onClickHandler}>
                
                    <input type="file" 
                    accept="image/*"
                    name="dp" 
                    required
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    onClick={e => (e.target.value = null)}
                    
                    />

                    <input type="submit" className="profile-btn"
                    value="Upload" 
                    />
                    
                </form>
                
                </div>



            <div className="personal-section">
               
                <div className="name">
                <div className="section">
                <h1>First Name</h1>
                </div>
                {!namefield?
                <h1>{userdata.first_name}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={userdata.first_name}
                onChange={(e)=>{setfName(e.target.value)}}
                />
                
                <button onClick={onChangeName}>Save</button>
                </div>
                }
                <EditIcon className="editicon" onClick={clickHandlerA}/>
                </div>

                <div className="name">
                
                <div className="section">
                <h1>Last Name</h1>
                </div>
                {!namefield2?
                <h1>{userdata.last_name}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={userdata.last_name}
                onChange={(e)=>{setlname(e.target.value)}}
                />
                <button onClick={onChangelname}>Save</button>
                </div>
                }
                <EditIcon className="editicon" onClick={clickHandlerD}/>
                </div>



                <div className="name">
                
                <div className="section">
                <h1>Username</h1>
                </div>
                {!usernamefield?
                <h1>{userdata.username}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={userdata.username}
                onChange={(e)=>{setUserName(e.target.value)}}
                />
                <button onClick={onChangeUsername}>Save</button>
                </div>
                }
                <EditIcon className="editicon" onClick={clickHandlerB}/>
                </div>

                <div className="name">
                <div className="section">
                <h1>Email</h1>
                <h1>{userdata.email}</h1>
                </div>
                <NotInterestedIcon className="editicon" />
                </div>

                <div className="name">
                
                <div className="section">
                <h1>About</h1>
                </div>
                {!aboutfield?
                <h1>{userdata.about}</h1>
                :
                <div className="conditioned-input">
                <textarea 
                type="text"
                defaultValue={userdata.about}
                onChange={(e)=>{setAbout(e.target.value)}}
                />
                <button onClick={onChangeAbout}>Save</button>
                </div>
                }
                <EditIcon className="editicon" onClick={clickHandlerC}/>
                </div>
            

              </div>
  
            </div>
            
       
    )}
    else{
        return <h1>Loading</h1>
    }
}


export default connect(null, {changeFirstName,changeDP,
    changeLastName,changeUsername,changeAbout})(Profile)
