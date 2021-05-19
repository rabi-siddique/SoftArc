import React from 'react'
import {useHistory} from 'react-router-dom'
import {MiniNavBar} from '../../components'
import {TableData} from '../../components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Table.css'


function Table(props) {
    const icon_color = props.darkmode?"#fff":"#121212"
    let history = useHistory()

    const clickHandler = ()=>{
        history.goBack()
    }
    
    
    
    return (
        <div className="entire-table">
            
           <ArrowBackIcon onClick={clickHandler}/>
            <MiniNavBar icon_color={icon_color} id={props.id} darkmode={props.darkmode}/>
            <TableData />
    
        </div>
    )
}

export default Table
