import React,{useState} from 'react'
import './SavedCard.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import {Link} from 'react-router-dom'
import axios from 'axios'


function SavedCard(props) {
    
    const [data,setData] = useState(JSON.parse(props.data))
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [menu,showMenu] = useState(false)
    const [namefield,setNameField] = useState(false)
    const [detailfield,setDetailField] = useState(false)
    const [name,setName] = useState(props.name)
    const [details,setDetails] = useState(props.details)

    let url2 = `http://127.0.0.1:8000/scanner/update/${props.id}/`;

    const config = {
        headers:{
        "Content-Type":"application/json",
       'Authorization': `JWT ${localStorage.getItem('access')}`
    }}

    const config_2 = {
        headers:{
        
       'Authorization': `JWT ${localStorage.getItem('access')}`
    }}

    const onChangeName = ()=>{
        const resp = axios.patch(url2,{"name":name},config)
        setNameField(false)
    }

    const onChangeDetails = ()=>{
        
        const resp = axios.patch(url2,{"details":details},config)
        setDetailField(false)
    }

    const clickHandlerA = ()=>{
        setNameField(!namefield)
    }

    const clickHandlerB = ()=>{
        setDetailField(!detailfield)
    }
        
    
    

    const ClickA = () => {
        setdatareceived(data.datareceived)
    }

    const ClickB = () => {
        setdatareceived(data.datareceived)
    }

   

    const ClickC = async () => {
        let url = `http://127.0.0.1:8000/scanner/saved/${props.id}/`;
        const response = await axios.delete(url,config)
    }

    
    
    return (
        <div className="Card">
            <div className="icon" onClick={()=>{showMenu(!menu)}}>
                <MoreVertIcon />
                {menu &&
                <div className="deletebtn" onClick={ClickC}> 
                <DeleteIcon />
                <div className="delete-menu">
                    <ul>
                        <li>Delete</li>
                    </ul>

                </div>
                </div>
                }
            </div>

            <div className="name">
            {!namefield?
                <h1 className="svname">{name}</h1>
                :
                <div className="conditioned-input-2">
                <input 
                type="text"
                defaultValue={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <button onClick={onChangeName}>Save</button>
                </div>
            }
            <EditIcon className="editicon" onClick={clickHandlerA}/>
            </div>

            <div className="details">
            {!detailfield?
            <p>{details}</p>
            :
            <div className="conditioned-text-2">
                <textarea 
                cols="30" rows="5"
                type="text"
                defaultValue={details}
                onChange={(e)=>{setDetails(e.target.value)}}
                />
                <button onClick={onChangeDetails}>Save</button>
            </div>
            }
            <EditIcon className="editicon" onClick={clickHandlerB}/>
            </div>


            <div className="svbuttons">
            <Link to="/cd"><button className="svbtn" onClick={ClickB}>Show Class Diagram</button></Link>
            <Link to="/table"><button className="svbtn2" onClick={ClickA}>Show Table</button></Link>
            </div>
        </div>
    )
}


export default SavedCard
