import React,{useState,forwardRef,useImperativeHandle} from 'react'
import './Modal.css'
import { useContext } from 'react'
import {DataContext} from '../../DataContext'
import axios from 'axios'



const Modal = forwardRef((props,ref) =>  {
    const [display,setDisplay] = useState(false)
    const owner = props.id
    
    const open = () => { 
        setDisplay(true)
    }

    const close = () => {
        setDisplay(false)
    }

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
            close()
           

        }
        catch(err){
            console.log(err.response)
        }
    }
    
    

    useImperativeHandle(ref,()=>{
        return {
            openModal: () => open(),
            close: () => close()
        }
    })
    
    if(display){

    return (
        <div className="modal-wrapper">
        <div onClick={close} className="modal-backdrop" />
        <div className="modal-box">
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
        </div>
    )
    }
    else{
        return null
    }
})

export default Modal
