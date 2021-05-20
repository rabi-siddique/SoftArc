import React,{useState,useEffect} from 'react'
import './ResetPassword.css'
import {connect} from 'react-redux'
import Logo from './SoftArcLogo.jpg'
import {reset_password,messageclear} from '../../actions/auth'
import CloseIcon from '@material-ui/icons/Close';
import ClipLoader from "react-spinners/ClipLoader";


function ResetPassword({reset_password,messageclear,message}) {
    
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#000");
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLoading(!loading)
        reset_password(email);
       

    };

    useEffect(()=>{
        messageclear()
    },[])

    useEffect(()=>{
        setLoading(false)
    },[message])

    return (
        <div className="rp-components">

            <div className="rp-right-component">
               <h1 className="rp-head-text">Reset Password</h1>
            </div>
            
            <div className="rp-left-component">
            <div className="rp-head">
                <img src={Logo}/>
            </div>

            {message? 
            <div className="warning-login">
            <p>{message}</p>
            <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
            </div>
            :
            <div>
            <h1 className="rp-head-text-2">Request Password Reset:</h1>
                     <div className="rp-form-elements">
                     
                   
             { loading?                             
        
                <ClipLoader color={color}  size={150} />
                :  
             
             <form onSubmit={e => onSubmit(e)}>
                            <input
                                className='rp-input'
                                type='email'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                <button className='rp-btn-1' type='submit'>Reset Password</button>
                    </form>}
                    </div>

                </div>}
                </div>
        </div>
    )
}

const mapStateToProps = state => ({
    
    message: state.auth.message
})


export default connect(mapStateToProps, { reset_password,messageclear })(ResetPassword);