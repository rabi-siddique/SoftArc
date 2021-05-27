import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {MiniNavBar} from '../../components'
import {TableData} from '../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Table.css'


function Table(props) {
    const icon_color = props.darkmode?"#fff":"#121212"
    let history = useHistory()
    const [divName,setdivName] = useState("")

    const clickHandler = ()=>{
        history.goBack()
    }
    
    
    
    return (
        <div className="entire-table">
            <div className="goback">
           <ArrowBackIcon  onClick={clickHandler}/>
           </div>
           <MiniNavBar divName={divName}/>
            <TableData setdivName={setdivName}/>
    
        </div>
    )
}

export default Table
