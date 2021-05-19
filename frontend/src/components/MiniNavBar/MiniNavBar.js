import React,{useState} from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ShareIcon from '@material-ui/icons/Share';
import {IconButton} from '@material-ui/core'
import './MiniNavbar.css'
import {Modal} from '../../components'


function MiniNavBar(props) {
    const [show,setShow] = useState(false)
    const clickhandler = () =>{
        setShow(true)
    }
    
    return (
        <div className="table-nav-bar">
            <IconButton className="it" onClick={clickhandler}>
            <SaveAltIcon style={{fill: props.icon_color}}/>
            <h2>Save</h2>
            </IconButton>
            <Modal
                onClose={()=>{setShow(false)}} 
                show={show}
                id={props.id}
                darkmode={props.darkmode}
                />

            <IconButton className="it">
            <GetAppIcon style={{fill: props.icon_color}}/>
            <h2>Download</h2>
            </IconButton>

            <IconButton className="it">
            <ShareIcon style={{fill: props.icon_color}}/>
            <h2>Share</h2>
            </IconButton>
            
        </div>
    )
}

export default MiniNavBar
