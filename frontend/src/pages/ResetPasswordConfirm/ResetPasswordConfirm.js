import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth';
import Logo from './SoftArcLogo.jpg'
import './ResetPasswordConfirm.css'

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/dash' />
    }
    return (
        <div className="rps-components">

            <div className="rps-right-component">
               <h1 className="rps-head-text">Reset Password</h1>
            </div>
            
            <div className="rps-left-component">
            <div className="rps-head">
                <img src={Logo}/>
            </div>
            <h1 className="rps-head-text-2">Request Password Reset:</h1>
                     <div className="rps-form-elements">
                     
                    <form onSubmit={e => onSubmit(e)}>
                    <input
                        className='rps-input'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                    <input
                        className='rps-input'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                <button className='rps-btn-1' type='submit'>Reset Password</button>
                    </form>
                    </div>

                </div>
        </div>
    )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);