import React from 'react'
import './ClassDiagram.css'
import {MiniNavBar} from '../../components'
import {CDBox} from '../../components'
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import {useHistory} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function ClassDiagram(props) {
    const ref = React.createRef()
    const icon_color = props.darkmode?"#fff":"#121212"
    const [datareceived,setdatareceived] = useContext(DataContext)
    const arr = datareceived[0]
    const ext = datareceived[1]
    let history = useHistory()
    let cd = "cd"
    const options = {
        orientation: 'landscape',
        
    };

    const clickHandler = ()=>{
        history.goBack()
    }
  
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-600">
            <div className="goback">
            <ArrowBackIcon style={{fill:props.darkmode?"#121212":"#fff"}} onClick={clickHandler}/>
            </div>
            <MiniNavBar 
            d={cd}
            ref={ref}
            filename="ClassDiagram.pdf"
            icon_color={icon_color} 
            email={props.email}
            id={props.id} darkmode={props.darkmode}/>

        <div className="boxes" ref={ref}>
            {arr.map(a => (
                <CDBox clss={a[0]} 
                ext = {ext}
                vdata={a[1]} 
                mdata={a[2]}
                extended_class = {a[3]}
                interfaces = {a[4]} 
                icon_color={icon_color}
                />
 ))}
        </div>
        </div>
    )
}

export default ClassDiagram
