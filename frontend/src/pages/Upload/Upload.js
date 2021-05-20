import React,{useState,useContext,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import './Upload.css'
import axios from 'axios'
import {DataContext} from '../../context/DataContext'

function Upload(props) {

    const [selected,setSelected] = useState(null)
    const [received,setReceived] = useState(false)
    const [filetype,setFileTye] = useState("java")
    const [errorMessage, setErrorMessage] = useState(false);
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [errorfiles,seterrorfiles] = useState([])
    

    const onChangeHandler=event=>{
        setSelected(event.target.files)
    }

    let url = `http://127.0.0.1:8000/scanner/upload/${props.id}/`;
    const config = {
        headers:{
        "Content-Type":"multipart/form-data",
        'Authorization': `JWT ${localStorage.getItem('access')}`
    }}
    
    const filechecker = () =>{
        
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
    

    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const status = filechecker()
        console.log(status)
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
        
    }

    if(received === true){
        console.log(received)
        return <Redirect to="/buttons"/>
    }    

    return (
        <div className="upload-container">

            {errorMessage &&
            <div className="error-message">
                <h1>
                    Please select files with the extension .{filetype} or
                    select appropriate filetype.
                </h1>
                <button onClick={()=>{
                    setErrorMessage(false)
                    seterrorfiles([])
                    }}>
                    OK
                </button>
            </div>
            }
            
                <form method="post" 
            encType="multipart/form-data"
            onSubmit={onClickHandler}
            >
            <div className="file-selection">
            <input type="file" name="myfile" multiple onChange={onChangeHandler} required/>
            <select  required value={filetype} onChange={e => setFileTye(e.target.value)} className="file-options">
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="cs">C#</option>
            </select>
            </div>
            <button className="ubtn" type="submit">Submit</button>
            
            </form>
            </div>
            
        
    )
}


export default Upload
