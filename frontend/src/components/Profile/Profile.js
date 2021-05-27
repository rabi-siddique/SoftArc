import React,{useState} from 'react'
import './Profile.css'
import { connect } from 'react-redux';
import logo1 from './SoftArcLogo1.JPG'
import logo2 from './SoftArcLogo2.JPG'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {changeFirstName,changeLastName,changeDP,
    changeUsername,changeAbout} from '../../actions/auth'

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);






function Profile({imagename,userdata,changeFirstName,changeLastName,
    changeUsername,changeAbout,changeDP}) {
    const [namefield,setNameField] = useState(false)
    const [namefield2,setNameField2] = useState(false)
    const [usernamefield,setUsernameField] = useState(false)
    const [aboutfield,setAboutField] = useState(false)
    const [fname,setfName] = useState("")
    const [lname,setlname] = useState("")
    const [username,setUserName] = useState("")
    const [about,setAbout] = useState("")
    const [selectedFile,setSelectedFile] = useState()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
        handleClose()
        setSelectedFile(null)
        
    }


    if(userdata){

    return (
        <div className="profile">



<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upload Image
        </DialogTitle>
        <DialogContent dividers>
            
        <div class="flex w-full  items-center justify-center bg-grey-lighter">
        <form method="patch" encType="multipart/formdata" 
                onSubmit={onClickHandler}>

<label
  className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-600 hover:text-white text-white-600 ease-linear transition-all duration-150">
   <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
  <span className="mt-2 text-base leading-normal">Select an Image</span>
  
  <input type='file' 
            class="hidden"
            accept="image/*"
            name="dp" 
            required
            onChange={(e) => setSelectedFile(e.target.files[0])}
            onClick={e => (e.target.value = null)}/>
</label>

<div className="mt-2">
{selectedFile &&<img id="blah" 
width="150"
height="20"
src={URL.createObjectURL(selectedFile)} 
alt="image" />}
</div>
    <div className="mt-2">
    <input type="submit" value="Upload" 
    class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
    </div>
    </form>
</div>


        </DialogContent>
        <DialogActions>
            <button onClick={handleClose} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
            </button>
        </DialogActions>
      </Dialog>





      <div className="max-w-full  bg-white w-full rounded-lg shadow-xl">
      <div className="bg-center bg-cover bg-no-repeat rounded relative  h-48">
                <img src="https://cdn.tuk.dev/assets/photo-1519252161722-1d52d47ac7df.jpg" alt className="w-full h-full object-cover overflow-hidden rounded shadow" />
               {/* <div className="flex bg-white dark:bg-gray-800 items-center px-3 py-2 shadow rounded absolute right-0 mr-4 mt-4 cursor-pointer top-0">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Change Cover Photo</p>
                    <div className="ml-2 text-gray-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1={16} y1={5} x2={19} y2={8} />
                        </svg>
                    </div>
</div>*/}

            
           {/* <div onClick={handleClickOpen} className="w-40 h-40 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                <img src={userdata.image} alt className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1={16} y1={5} x2={19} y2={8} />
                    </svg>
                    <p className="text-xs text-gray-200">Edit Picture</p>
                </div>
            </div>*/}

<div className="w-40 h-40 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow">
    <img src={userdata.image} alt className="w-full h-full object-cover overflow-hidden absolute z-0 rounded-full shadow" />
    <div onClick={handleClickOpen} className="bg-white dark:bg-gray-800 h-6 w-6 rounded-full flex items-center justify-center right-0 absolute cursor-pointer text-gray-600 dark:text-gray-400">
        {/*<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1={16} y1={5} x2={19} y2={8} />
            <i class="fa fa-camera" aria-hidden="true"></i>
        </svg>*/}
        <i class="fa fa-camera" aria-hidden="true"></i>
        
    </div>
    </div>
            
            </div>


        <div className="p-4 border-b flex flex-col justify-center items-center">
            
            <h2 className="text-2xl mt-8">
                User Profile
            </h2>
            <p className="text-sm text-gray-500">
                Personal details 
            </p>
        </div>
        <div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    First Name
                </p>

                {!namefield?
                <p>
                    {userdata.first_name}
                </p>
                : <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="grid-first-name" 
                type="text" 
                defaultValue={userdata.first_name}
                onChange={(e)=>{setfName(e.target.value)}}
                ></input>
                }

                {!namefield?
                <div className="ml-8">
                <button onClick={clickHandlerA}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
                </button>
                </div>
                :
                <div className="ml-9">
                <button onClick={onChangeName}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
                </button>
                </div>
                }
            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Last Name
                </p>
                
                {!namefield2?
                <p>
                    {userdata.last_name}
                </p>
                : <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="grid-first-name" 
                type="text" 
                defaultValue={userdata.last_name}
                onChange={(e)=>{setlname(e.target.value)}}
                ></input>
                }

                {!namefield2?
                <div className="ml-8">
                <button onClick={clickHandlerD}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
                </button>
                </div>
                :
                <div className="ml-9">
                <button onClick={onChangelname}
               className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Save
                </button>
                </div>
                }
            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Email Address
                </p>
                <p>
                    {userdata.email}  
                </p>
                <div className="ml-9">
                <button className=" w-2/3 bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                Edit
                </button>
                </div>
            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    UserName
                </p>
                {!usernamefield?
                <p>
                    {userdata.username}
                </p>
                : <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="grid-first-name" 
                type="text" 
                defaultValue={userdata.username}
                onChange={(e)=>{setUserName(e.target.value)}}></input>
                }
                 

                {!usernamefield?
                <div className="ml-8" >
                <button onClick={clickHandlerB}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
                </button>
                </div>
                :
                <div className="ml-9" >
                <button onClick={onChangeUsername}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
                </button>
                </div>
                }

            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    About
                </p>
                {!aboutfield?
                <p>
                    {userdata.about}
                </p>
                : 
                <div>
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                 defaultValue={userdata.about}
                onChange={(e)=>{setAbout(e.target.value)}}
                />
              </div>

                }

                {!aboutfield?
                <div className="ml-8" >
                <button onClick={clickHandlerC}
                className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
                </button>
                </div>:
                <div className="ml-9">
                <button onClick={onChangeAbout}
               className="w-2/3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Save
                </button>
                </div>
                }
            </div>

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
