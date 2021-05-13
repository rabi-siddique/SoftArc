import React,{useRef} from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ShareIcon from '@material-ui/icons/Share';
import {IconButton} from '@material-ui/core'
import './MiniNavbar.css'
import {Modal} from '../../components'


function MiniNavBar(props) {
    
    const modalRef = useRef()

    const openModal = () => {
        modalRef.current.openModal()
    }
    

    return (
        <div className="table-nav-bar">
            <IconButton className="it" onClick={openModal}>
            <SaveAltIcon style={{fill: props.icon_color}}/>
            <h2>Save</h2>
            </IconButton>

            <Modal ref={modalRef} id={props.id}/>

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
