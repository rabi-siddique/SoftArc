import React,{useState,useEffect} from 'react'
import './Profile.css'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {Avatar,IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop : '20px',
    marginBottom : '20px',
    fontSize: '60px',
    
  },
  
}));

function Profile(props) {
    const classes = useStyles();
    const [namefield,setNameField] = useState(false)
    const [namefield2,setNameField2] = useState(false)
    const [usernamefield,setUsernameField] = useState(false)
    const [aboutfield,setAboutField] = useState(false)
    const [profiledata,setprofiledata] = useState(props.data)
    const [name,setName] = useState(props.firstname)
    const [lname,setlname] = useState(props.lastname)
    const [username,setUserName] = useState("")
    const [about,setAbout] = useState("")
    const [selectedFile,setSelectedFile] = useState()
    const config = {headers:{"Content-Type":"multipart/form-data",accept:'application/json'}}
    

    let url2 = `http://127.0.0.1:8000/profile/update/${props.userdata?.id}/`;
    let url3 = `http://127.0.0.1:8000/profile/updatedp/${props.userdata?.id}/`;
    
    
    const onChangeName = ()=>{
        
        const resp = axios.patch(url2,{"first_name":name})
        props.setfirstname(name)
        setNameField(false)
    }

    const onChangelname = ()=>{
        
        const resp = axios.patch(url2,{"last_name":lname})
        props.setlastname(lname)
        setNameField2(false)
    }

    const onChangeUsername = ()=>{
        const resp = axios.patch(url2,{"username":username})
        profiledata.username = username
        setUsernameField(false)
    }

    const onChangeAbout = ()=>{
        
        const resp = axios.patch(url2,{"about":about})
        profiledata.about = about
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

   
    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const data = new FormData()
        data.append("image",selectedFile,selectedFile.name)
        
        try{
            const resp = await axios.patch(url3, data,config)
            props.setimageurl(`${process.env.REACT_APP_API_URL}${resp.data.image}`)
            e.target.value = null
            
        }
        catch(err){
            console.log(err.response)
        }
    }


    if(props.userdata){

    return (
        <div className="profile">
            <div className="profile-banner">
               <h1> Welcome to your Profile !</h1>
            </div>
            
  
             <div className="profile-picture">
    
             <Avatar className={classes.large} 
             src={props.imageurl}>
                 {props.imagename}</Avatar>
          
            
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
                <h1>{props.firstname}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={props.firstname}
                onChange={(e)=>{setName(e.target.value)}}
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
                <h1>{props.lastname}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={props.lastname}
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
                <h1>{profiledata.username}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={profiledata.username}
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
                <h1>{props.userdata.email}</h1>
                </div>
                <NotInterestedIcon className="editicon" />
                </div>

                <div className="name">
                
                <div className="section">
                <h1>About</h1>
                </div>
                {!aboutfield?
                <h1>{profiledata.about}</h1>
                :
                <div className="conditioned-input">
                <textarea 
                type="text"
                defaultValue={profiledata.about}
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



export default Profile
  