import React,{useState,useEffect} from 'react'
import './Profile.css'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import SendIcon from '@material-ui/icons/Send';
import dp from './dp.jpg'
import {ResetPasswordModal} from '../../components';

function Profile(props) {
    
    const [namefield,setNameField] = useState(false)
    const [usernamefield,setUsernameField] = useState(false)
    const [aboutfield,setAboutField] = useState(false)
    const [profiledata,setprofiledata] = useState({})
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const [about,setAbout] = useState("")
    const [show,setShow] = useState(false)
    const [selectedFile,setSelectedFile] = useState()
    const config = {headers:{"Content-Type":"multipart/form-data",accept:'application/json'}}
    

    let url = `http://127.0.0.1:8000/profile/get/${props.userdata?.id}/`;
    let url2 = `http://127.0.0.1:8000/profile/update/${props.userdata?.id}/`;
    let url3 = `http://127.0.0.1:8000/profile/updatedp/${props.userdata?.id}/`;
            
                    
    

    const onChangeName = ()=>{
        const resp = axios.patch(url2,{"fullname":name})
        profiledata.fullname = name
        setNameField(false)
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

    
        useEffect(()=>{
            async function fetchData(){
        
            const resp = await axios.get(url)
            setprofiledata(resp.data)
            console.log(resp.data)
                      
        }  

            fetchData()

   },[url])

    const clickHandlerA = ()=>{
        setNameField(!namefield)
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
        console.log(data)
        try{
            const resp = await axios.patch(url3, data,config)
           
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
            <img src={dp} /> 

                <form method="patch" encType="multipart/formdata" 
            onSubmit={onClickHandler}>
                

                    <input type="file" 
                    accept="image/*"
                    name="dp" 
                    
          onChange={(e) => setSelectedFile(e.target.files[0])}/>

                    <input type="submit"/>
                </form>
                
                

            </div>

            <div className="personal-section">
               
                <div className="name">
                {!namefield?
                <h1>{profiledata.fullname}</h1>
                :
                <div className="conditioned-input">
                <input 
                type="text"
                defaultValue={profiledata.fullname}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <button onClick={onChangeName}>Save</button>
                </div>
                }
                <EditIcon className="editicon" onClick={clickHandlerA}/>
                </div>

                <div className="name">
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

                <h1>{props.userdata.email}</h1>
                <h1 onClick={()=>{setShow(true)}}>Reset Password</h1>
                <ResetPasswordModal
                onClose={()=>{setShow(false)}} 
                show={show}/>
              </div>
            

            <div className="about-section">
                <div className="icon">
                <EditIcon className="editicon" onClick={clickHandlerC}/>
                </div>
                <h1>About</h1>
                {!aboutfield?
                <p>
                {profiledata.about}
                </p>
                :
                <div className="conditioned-text">
                <textarea 
                type="text"
                defaultValue={profiledata.about}
                onChange={(e)=>{setAbout(e.target.value)}}
                />
                <button onClick={onChangeAbout}>Save</button>
                </div>
                }

               
                
            </div>
        </div>
    )}
    else{
        return <h1>Loading</h1>
    }
}



export default Profile
  