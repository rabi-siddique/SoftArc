import React,{useState,useEffect} from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ShareIcon from '@material-ui/icons/Share';
import { useContext } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
import {DataContext} from '../../context/DataContext'
import './MiniNavbar.css'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Pdf from 'react-to-pdf'
import MailIcon from '@material-ui/icons/Mail';
import ClipLoader from "react-spinners/ClipLoader";


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
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#000");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
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

    const handleClickOpen2 = () => {
      setOpen2(true);
  };
  const handleClose2 = () => {
      setOpen2(false);
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
    let url3 = 'http://127.0.0.1:8000/scanner/share/';
    
    
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

const EmailHandler = (e)=>{
  
  e.preventDefault();

    const newEmail = 
      {
        id: Math.floor(Math.random() * 10000),
        text: email
      }
    
    setEmails([...emails].concat(newEmail));
    setEmail("");
}   

const deleteEmail = (id)=> {
  let updatedEmails = [...emails].filter((email) => email.id !== id);
  setEmails(updatedEmails);
}

const postEmail = () => {
  if(emails.length !== 0){
  setLoading(true)
  let receivers = []
  let x;
  for(x of emails){
      receivers.push(x.text)
  }

  const type = props.d
  const usermail = props.email
  const data = JSON.stringify({usermail,datareceived,type,receivers})
  axios.post(url3, data,config).then(res => {
    setmsg("Sent Successfully.")
    setEmail("")
    setEmails([])
    setLoading(false)
  }).catch(err => {
      console.log(err.response);
      setmsg("Unable to Send Mail. Please Try Later")
      setEmail("")
      setEmails([])
  })
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



      <Dialog 
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose2} 
            aria-labelledby="customized-dialog-title" open={open2}>
    <DialogTitle id="customized-dialog-title" 
        className="dark:bg-gray-900 dark:text-gray-100"
    onClose={handleClose2}>
    <MailIcon/> Share via Email
    </DialogTitle>
        <DialogContent  className="dark:bg-gray-900 dark:text-gray-100" dividers>
        


        <div class="flex w-full  items-center justify-center bg-grey-lighter ">

        {msg?

        <div>
        <p className="err-already">{msg}</p>

        </div>
            
   : 

   <div>
    
   { 
   loading? 
   <div className="flex justify-center items-center">                            
  <ClipLoader color={props.darkmode?'#000':'#fff'}  size={150} />
  </div>
  :<div>
   <form onSubmit={EmailHandler}>

  <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b dark:hover:bg-gray-900">
               
          <p className="text-gray-600 dark:text-gray-300">
              Receiver's Email
            </p>

                <input 
    className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 border-gray-300 border shadow" 
                id="grid-first-name" 
                type="email" 
                required
                name="email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}>
                </input>

<button type="submit"
    className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Add
  </button>
    </div>
    </form>
               

                
                {emails.map(item => {
      return <div 
      className="flex inline-flex pt-1 pb-1 pl-2 pr-2 m-2 rounded-2xl bg-indigo-100 dark:bg-gray-700 dark:bg=gray-100"
      key={item.id}>
                {item.text}
                
                <CloseIcon 
                className="pl-2 cursor-pointer"
                onClick={() => deleteEmail(item.id)} />
                </div>;
    })}
    </div>
  }
                
      
                <div className="mt-2  flex justify-center">
<button 
onClick ={()=>{postEmail()}}
class="w-40 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                
                Send Mail
            </button>
            </div>
          </div>
                
                
                
    }
        
        </div>


        </DialogContent>
        <DialogActions className="dark:bg-gray-900 dark:text-gray-100">
            <button onClick={handleClose2} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
            </button>
        </DialogActions>
      </Dialog>


   
   
 
  <div className="grid sm:flex justify-center mx-auto mb-4 my-6 md:w-5/12 sm:px-10 sm:py-6 py-4 px-4 dark:bg-gray-900 rounded-md">
              
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
    <button 
    onClick={handleClickOpen2}
    class="w-36 ml-2 mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    
     Share
    </button>
      
        </div>
        </div>
    )
})

export default MiniNavBar
