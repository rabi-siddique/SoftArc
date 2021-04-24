import React,{useState} from 'react'
import './Upload.css'
import axios from 'axios'

function Upload() {

    const [selected,setSelected] = useState(null)
    const config = {headers:{"Content-Type":"multipart/form-data"}}



    const onChangeHandler=event=>{
        setSelected(event.target.files)
    }

    const onClickHandler = () => {
        const data = new FormData()
        for(var x = 0; x<selected.length; x++) {
            data.append('file', selected[x])
        }
        console.log("YOHO")
     
       axios
       .post("http://127.0.0.1:8000/scanner/upload", data,config)
       .then(res => { // then print response status
        console.log("hello")
         console.log(res.statusText)
         console.log(res.data)
      })
      .catch((err)=>{console.log(err.response)})
     }
     
    

    return (
        <div className="upload-container">

            <form method="post" enctype="multipart/form-data">
    
            <input type="file" name="myfile" multiple onChange={onChangeHandler} />
            <button type="submit" onClick={onClickHandler}>Upload</button>
            </form>

        </div>
    )
}

export default Upload


