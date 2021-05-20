import React,{useState} from 'react'
import './Modal.css'
import ReactDOM from 'react-dom'
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import axios from 'axios'
import SaveAltIcon from '@material-ui/icons/SaveAlt';

function Modal(props){

    const owner = props.id
    const [msg,setmsg] = useState("")
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [formData, setFormData] = useState({
        name: '',
        details: '' 
    });

    const { name, details } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    


    let url = 'http://127.0.0.1:8000/scanner/save/';
    const config = {headers:{"Content-Type":"application/json"}}

    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const data = JSON.stringify({datareceived})
        const body = JSON.stringify({ name, details, data,owner });
        try{
            const resp = await axios.post(url, body,config)
            setmsg("Data Saved Successfully.")
           

        }
        catch(err){
            console.log(err.response)
            if(err.response.data.data){
                setmsg(err.response.data.data)
            }
        }
    }

    const closeHandler = ()=>{
        setmsg("")
        props.onClose()
        setFormData({name: '',
        details: ''})
        
        
    }
    

    return ReactDOM.createPortal(
        <div className={`modal ${props.show ? `show` : ``}`} onClick={props.onClose}>
            <div className={`modal-content ${props.darkmode ? `dark-modal-content` : ``}`}
             onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <SaveAltIcon/>
                    <h4 className="modal-title">Save Data</h4>
                </div>
                <div className="modal-body">
                    
           {msg?

           <div>
        <p className="err-already">{msg}</p>
        
        </div>
               
              : 
            <form className="form-elements" onSubmit={onClickHandler}>
                        <p>Name of the Project:</p>

                        <input 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={e => onChange(e)}
                        />
                        <p>Add Details:</p>

                        <input 
                        id="details"  
                        type="text" 
                        name="details" 
                        value={details}
                        onChange={e => onChange(e)}
                        />
                        <input id="save-btn" type="submit" value="Save" />
                        </form>
}
                            </div>
                            <div className="modal-footer">
                                <button 
                                onClick={closeHandler}
                                className="button">
                                    Close
                                </button>
                            </div>
            </div>
            
        </div>
    ,document.getElementById('root'))
}
    
export default Modal
    

