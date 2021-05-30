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
    let tb = "tb"
    const options = {
        orientation: 'landscape',
        
    };

    const clickHandler = ()=>{
        history.goBack()
    }
    
    const ref = React.createRef()
 
    
    return (
        <div className="w-full min-h-screen bg-gray-200 dark:bg-gray-600">
            <div className="goback">
           <ArrowBackIcon style={{fill:props.darkmode?"#121212":"#fff"}} onClick={clickHandler}/>
           </div>
           <MiniNavBar 
           d = {tb}
           ref={ref}
           email={props.email}
           darkmode = {props.darkmode}
           id = {props.id}
           filename="Table.pdf"
           divName={divName}/>

           <div className="PDF" ref={ref}>
            <TableData  setdivName={setdivName}/>
            </div>
        </div>
    )
}

export default Table
