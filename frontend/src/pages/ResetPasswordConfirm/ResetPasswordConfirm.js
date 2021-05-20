import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm,messageclear } from '../../actions/auth';
import Logo from './SoftArcLogo.jpg'
import './ResetPasswordConfirm.css'
import CloseIcon from '@material-ui/icons/Close';
import ClipLoader from "react-spinners/ClipLoader";



const ResetPasswordConfirm = ({ match, reset_password_confirm,message,messageclear }) => {
   
    const [passcheck,setpasscheck] = useState(false)
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#000");

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;
    
    useEffect(()=>{
        messageclear()
    },[])

    useEffect(()=>{
        setLoading(false)
    },[message])

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        
        const uid = match.params.uid;
        const token = match.params.token;

        if(new_password == re_new_password){
            setLoading(!loading)
            reset_password_confirm(uid, token, new_password, re_new_password);
        }
        else{
            setpasscheck(true)
            
        }

       
    };

    

    return (
        <div className="rps-components">

            <div className="rps-right-component">
               <h1 className="rps-head-text">Reset Password</h1>
            </div>

           { message=="Password Changed Successfully."?
           
            <div className="rps-left-component">

                    <div className="rps-head">
                    <img src={Logo}/>
                    </div>

                   <div className="warning-login">
                    <p>{message}</p>
                    <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
                    </div>

                    <Link to="/login">
                        <button className='rps-btn-1'>
                            Navigate to Login 
                        </button>
                    </Link>
                </div>
            :
            <div className="rps-left-component">
            <div className="rps-head">
                <img src={Logo}/>
            </div>
            {message?
                <div className="warning-login">
                <p>{message}</p>
                <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
                </div>
                :
            <div>
                
            <div>
            <h1 className="rps-head-text-2">Request Password Reset:</h1>
                     <div className="rps-form-elements">
                     
                   { 
                   
                    loading?                             
                    <ClipLoader color={color}  size={150} />
                        :
                   <form onSubmit={e => onSubmit(e)}>
                    <input
                        className='rps-input'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                    <input
                        className='rps-input'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                <button className='rps-btn-1' type='submit'>Reset Password</button>
                    </form>}
                    </div>

                    
                {
                    passcheck &&
                    <div className="warning-login">
                        <p>Both Password Fields Should Match. Please Try Again.</p>
                        <CloseIcon className="closeicon" onClick={()=>{setpasscheck(false)}}/>
                    </div>
                }
                    </div>
                </div>}
                </div>
}
        </div>
    )
}

const mapStateToProps = state => ({
    message: state.auth.message
})

export default connect(mapStateToProps, { reset_password_confirm,messageclear })(ResetPasswordConfirm)
