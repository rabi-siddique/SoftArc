import React,{useState,useEffect} from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ShareIcon from '@material-ui/icons/Share';
import { useContext } from 'react'
import axios from 'axios'
import {DataContext} from '../../context/DataContext'
import './MiniNavbar.css'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Pdf from 'react-to-pdf'
var fileDownload = require('js-file-download');

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);




const MiniNavBar = React.forwardRef((props,ref)=> {
    const owner = props.id
    const [open, setOpen] = useState(false);
    const [msg,setmsg] = useState("")
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [formData, setFormData] = useState({
        name: '',
        details: '' 
    });

    const options = {
      orientation: 'landscape',
      
  };

    const { name, details } = formData;

    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setmsg("")
        setFormData({name: '',
        details: ''})
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
           
        }
    }; 


    let url = 'http://127.0.0.1:8000/scanner/save/';
    let url2 = 'http://127.0.0.1:8000/scanner/download/';
    
    
    const onClickHandler = async (e) => { // take the event as a parameter here
        e.preventDefault(); // Prevent form submission
        const data = JSON.stringify({datareceived})
        const body = JSON.stringify({ name, details, data,owner });
        try{
            const resp = await axios.post(url, body,config)
            setmsg("Data Saved Successfully.")
           

        }
        catch(err){
            console.log(err.response)
            if(err.response.data.data){
                setmsg(err.response.data.data)
            }
        }
    }

   

  

const handlePDFDownload = () => {
  const type = props.d
  const data = JSON.stringify({datareceived,type})
  axios.post(url2, data,config).then(res => {
      fileDownload(res.data, 'filename.pdf');
      console.log(res);
  }).catch(err => {
      console.log(err);
  })
}

 

    
    return (
        <div className="mininav">
            <Dialog 
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleClose} 
            aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" 
        className="dark:bg-gray-900 dark:text-gray-100"
    onClose={handleClose}>
    <SaveAltIcon/> Save Results
    </DialogTitle>
        <DialogContent  className="dark:bg-gray-900 dark:text-gray-100" dividers>
            
        <div class="flex w-full  items-center justify-center bg-grey-lighter ">

        {msg?

        <div>
        <p className="err-already">{msg}</p>

        </div>
            
   : 
    <form onSubmit={onClickHandler}>

                <div className="mt-2">
                <p>Name of the Project</p>

                <input className="appearance-none block w-80 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 border-gray-300 border shadow" 
                id="grid-first-name" 
                type="text" 
                name="name" 
                value={name}
                onChange={e => onChange(e)}
                required
                ></input>
                </div>

               <div className="mt-2">
                <p>Add Details</p>

                <textarea
                  rows={3}
                  className="appearance-none block w-80 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 border-gray-300 border shadow " 
                  type="text" 
                  required
                  name="details" 
                  value={details}
                  onChange={e => onChange(e)}
                />
                </div>
      
                <div className="mt-2">
<button class="w-40 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
            </div>

                
                
                </form>
    }
        
        </div>


        </DialogContent>
        <DialogActions className="dark:bg-gray-900 dark:text-gray-100">
            <button onClick={handleClose} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
            </button>
        </DialogActions>
      </Dialog>

   
   
 
  <div className="w-11/12 mx-auto mb-4 my-6 md:w-5/12 sm:px-10 sm:py-6 py-4 px-4 dark:bg-gray-900 rounded-md">
              
    <button onClick={handleClickOpen} class="w-36 ml-2 mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
     Save
    </button>
            

  <button 
  onClick={()=>handlePDFDownload()}
  class="w-36 ml-2 mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
     Download
  </button>

 {/* <Pdf targetRef={ref} 
            filename={props.filename} 
            options= {options}
            >
            {({ toPdf }) => <button 
            class="w-36 ml-2 mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={toPdf}>Download PDF</button>}
            </Pdf>
  */}
    <button class="w-36 ml-2 mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    
     Share
    </button>
      
        </div>
        </div>
    )
})

export default MiniNavBar
