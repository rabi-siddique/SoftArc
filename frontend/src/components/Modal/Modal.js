import React,{useState,forwardRef,useImperativeHandle} from 'react'
import './Modal.css'
import ReactDOM from 'react-dom'
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import axios from 'axios'



function Modal(props){

    const owner = props.id
   
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
            props.onClose()
           

        }
        catch(err){
            console.log(err.response)
        }
    }
    

    return ReactDOM.createPortal(
        <div className={`modal ${props.show ? `show` : ``}`} onClick={props.onClose}>
            <div className={`modal-content ${props.darkmode ? `dark-modal-content` : ``}`}
             onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Save Data</h4>
                </div>
                <div className="modal-body">
                    
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
                            </div>
                            <div className="modal-footer">
                                <button 
                                onClick={props.onClose}
                                className="button">
                                    Close
                                </button>
                            </div>
            </div>
            
        </div>
    ,document.getElementById('root'))
}
    
export default Modal
    

