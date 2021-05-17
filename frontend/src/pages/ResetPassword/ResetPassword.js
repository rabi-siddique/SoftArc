import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './ResetPassword.css'
import {connect} from 'react-redux'
import Logo from './SoftArcLogo.jpg'
import {reset_password} from '../../actions/auth'


function ResetPassword({reset_password}) {
    let history = useHistory()
    
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        history.push("/login")

    };

   

    return (
        <div className="rp-components">

            <div className="rp-right-component">
               <h1 className="rp-head-text">Reset Password</h1>
            </div>
            
            <div className="rp-left-component">
            <div className="rp-head">
                <img src={Logo}/>
            </div>
            <h1 className="rp-head-text-2">Request Password Reset:</h1>
                     <div className="rp-form-elements">
                     
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
                    </form>
                    </div>

                </div>
        </div>
    )
}

export default connect(null, { reset_password })(ResetPassword);