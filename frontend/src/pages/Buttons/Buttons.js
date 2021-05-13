import React from 'react'
import './Buttons.css'
import {Link,useHistory} from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Buttons() {
    let history = useHistory()

    const clickHandler = ()=>{
        history.push("/scanner")
    }
   
    return (
        <div className="buttons-container">
            <ArrowBackIcon onClick={clickHandler}/>
        <div className="buttons">
            <Link to="/table"><button className="btn1">Show Table</button></Link>
            <Link to="/cd"><button className="btn2">Show Class Diagram</button></Link>          
        </div>
        </div>
    )
}

export default Buttons
