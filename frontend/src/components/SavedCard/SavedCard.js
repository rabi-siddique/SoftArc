import React,{useState} from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useContext } from 'react'
import {DataContext} from '../../context/DataContext'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


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





function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function SavedCard(props) {
    const [open, setOpen] = useState(false);
    const [data,setData] = useState(JSON.parse(props.data))
    const [datareceived,setdatareceived] = useContext(DataContext)
    const [menu,showMenu] = useState(false)
    const [namefield,setNameField] = useState(false)
    const [detailfield,setDetailField] = useState(false)
    const [name,setName] = useState(props.name)
    const [details,setDetails] = useState(props.details)
    const [msg,setmsg] = useState("")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setmsg("")
      
  };

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
        try{
        const resp = axios.patch(url2,{"name":name},config)
        setNameField(false)
        setmsg("Data Saved Successfully.")
      }
        catch(err){

        }
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

        <Dialog 
            
            fullWidth={true}
            maxWidth={'sl'}
            onClose={handleClose} 
            aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" 
    className="dark:bg-gray-900 dark:text-gray-100"
    onClose={handleClose}>
    <EditIcon/> Edit Results
    </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-900 dark:text-gray-100">
            

  <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b dark:hover:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300">
                    Name
                </p>
                {!namefield?
                <p className="text-gray-800 dark:text-gray-100">
                    {name}
                </p>
                : <input 
    className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 border-gray-300 border shadow" 
                id="grid-first-name" 
                type="text" 
                defaultValue={name}
                onChange={(e)=>{setName(e.target.value)}}></input>
                }
                 

                {!namefield?
                <div>
                <button onClick={()=>{setNameField(true)}}
                className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
                </button>
                </div>
                :
                <div>
                <button onClick={onChangeName}
                className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
                </button>
                </div>
                }

            </div>


   <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b dark:hover:bg-gray-900">
   <p className="text-gray-600 dark:text-gray-300">
       Details
   </p>
   {!detailfield?
   <p className="text-gray-800 dark:text-gray-100">
       {details}
   </p>
   : 
   <div>
   <textarea
     id="details"
     name="details"
     rows={3}
className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-800 dark:text-gray-100 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 border-gray-300 border shadow" 
    defaultValue={details}
   onChange={(e)=>{setDetails(e.target.value)}}
   />
 </div>

   }

   {!detailfield?
   <div>
   <button onClick={()=>{setDetailField(true)}}
   className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
   Edit
   </button>
   </div>:
   <div>
   <button onClick={onChangeDetails}
   className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
   Save
   </button>
   </div>
   }
</div>

        
        


        </DialogContent>
        <DialogActions className="dark:bg-gray-900">
            <button onClick={handleClose} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
            </button>
        </DialogActions>
      </Dialog>

<div className="w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white dark:bg-gray-900 rounded-md">

<div className="flex justify-end">
<Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button 
className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 border-gray-300 border shadow">
              Options
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 border-gray-300 border shadow"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleClickOpen}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-700',
                        'block px-4 py-2 text-sm dark:text-gray-100 '
                      )}
                    >
                      
                      Edit
                     
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div onClick={ClickC}
                      
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-700',
                        'block px-4 py-2 text-sm dark:text-gray-100'
                      )}
                    >
                      Delete
                    </div>
                  )}
                </Menu.Item>
                
                </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
</div>

    <p 
    className="text-lg text-gray-800 dark:text-gray-100 pb-3 font-semibold">
    {name}</p>
    <p 
    className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">
    {details}
    </p>
    <Link to="/table">                  
    <button onClick={ClickA} class="mb-6 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
     Table
    </button>
    </Link>
    <Link to="/cd">
    <button onClick={ClickB} class="mb-4 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
     Class Diagram
    </button>
    </Link>
            
            </div>
        </div>

        
    )
}


export default SavedCard
