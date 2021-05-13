import React,{useState,useContext} from 'react'
import {Redirect} from 'react-router-dom'
import './Upload.css'
import axios from 'axios'
import {DataContext} from '../../DataContext'

function Upload() {

    const [selected,setSelected] = useState(null)
    const [received,setReceived] = useState(false)
    const [datareceived,setdatareceived] = useContext(DataContext)

    const onChangeHandler=event=>{
        setSelected(event.target.files)
    }

    let url = 'http://127.0.0.1:8000/scanner/upload/';
    const config = {headers:{"Content-Type":"multipart/form-data"}}
    
    

    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const data = new FormData()
        for(var x = 0; x<selected.length; x++) {
            data.append('file', selected[x])
            console.log(selected[x].type)
        }
        try{
            const resp = await axios.post(url, data,config)
            console.log(resp.data)
            setdatareceived(resp.data)
            setReceived(!received)
            
        }
        catch(err){
            console.log(err.response)
        }
    }

    if(received === true){
        console.log(received)
        return <Redirect to="/buttons"/>
    }    

    return (
        <div className="upload-container">

            <form method="post" 
            encType="multipart/form-data"
            onSubmit={onClickHandler}
            >
    
            <input type="file" name="myfile" multiple onChange={onChangeHandler} />
            <button className="ubtn" type="submit">Submit</button>
            
            </form>

        </div>
    )
}


export default Upload
