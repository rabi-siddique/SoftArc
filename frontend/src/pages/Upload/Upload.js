import React,{useState,useContext,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import './Upload.css'
import axios from 'axios'
import {DataContext} from '../../context/DataContext'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      
    
    },
  }));

function Upload(props) {

    const [selected,setSelected] = useState(null)
    const [received,setReceived] = useState(false)
    const [filetype,setFileTye] = useState("java")
    const [errorMessage, setErrorMessage] = useState(false);
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [errorfiles,seterrorfiles] = useState([])
    const [fileNo,setfileNo] = useState(0)
    const classNamees = useStyles();
    

    

    let url = `http://127.0.0.1:8000/scanner/upload/${props.id}/`;
    const config = {
        headers:{
        "Content-Type":"multipart/form-data",
        'Authorization': `JWT ${localStorage.getItem('access')}`
    }}
    
    const filechecker = () =>{
        console.log(selected)
        for(var x = 0; x<selected.length; x++) {
            let filename = selected[x].name
            let extension = filename.split(".").pop()
            
            if (extension !== filetype){
                errorfiles.push(filename)
            }
        }

        if(errorfiles.length === 0){
            return true
        }
        console.log(errorfiles.length)
        setErrorMessage(true)
        setSelected(null)
        return false
    }

    const onChangeHandler=event=>{
        setSelected(event.target.files)
        setfileNo(event.target.files.length)
    }
    

    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const status = filechecker()
        if(status){
        const data = new FormData()
        for(var x = 0; x<selected.length; x++) {
            data.append('file', selected[x])
            }
            
        try{
            const resp = await axios.post(url, data,config)
            setdatareceived(resp.data)
            setReceived(!received)
            
        }
        catch(err){
            console.log(err.response)
        }
        }
        else{
            seterrorfiles([])
            setSelected(null)
        }
        
    }

    if(received === true){
        console.log(received)
        return <Redirect to="/buttons"/>
    }    

    return (
<div className="flex flex-col justify-center items-center h-full bg-gray-200 dark:bg-gray-600">
            

{fileNo !== 0 && 
<div className="flex w-1/2 justify-center items-center bg-indigo-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>{fileNo} files have been select. Press the Upload button to continue.</p>
</div>
}

            <div className="w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-900 rounded-md">
                <p className="text-lg text-gray-800 dark:text-gray-100 pb-3 font-semibold">
                    Upload Your Files</p>

                <p className="text-sm text-gray-600 dark:text-gray-600 pb-3 font-normal">
                <form method="post" 
            encType="multipart/form-data"
            onSubmit={onClickHandler}
            >
            

    <label className="block w-full">
                <span className="text-gray-700 dark:text-gray-200">Select File Extension</span>
                <select className="form-select mt-1 block w-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-700" required value={filetype} onChange={e => setFileTye(e.target.value)}>
                <option value='java'>Java</option>
                <option value='cpp'>C++</option>
                <option value='cs'>C#</option>
                </select>
            </label>

    <div className="mt-8 w-full">
    <label
  className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-600 hover:text-white text-white-600 ease-linear transition-all duration-150">
   <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
  <span className="mt-2 text-base leading-normal">Select Files to Scan</span>
        <input className="hidden" type="file" name="myfile" multiple onChange={onChangeHandler} required/>
    </label>
    </div>

    <div className="mt-8 w-full">
    <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    Upload
    </button>
    </div>
    

            
            
            </form>  
                </p>
                
            </div>

            
            {errorMessage &&
            
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-700 dark:text-red-100" role="alert">
  <strong className="font-bold">Wrong File Extension Selected!</strong>
  <span className="block">Please Upload Files with the selected File Extension</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3 w-full">
    <svg onClick={()=>{
                    setErrorMessage(false)
                    seterrorfiles([])
                    setSelected(null)
                    }}
    className="fill-current ml-48 h-6 w-full text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>}

               
              
            </div>
            
        
    )
}



export default Upload
