import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { verify } from '../../actions/auth'
import Logo from './SoftArcLogo.jpg'
import './Activate.css'

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false)

    const verify_account = e => {
        const uid = match.params.uid
        const token = match.params.token

        verify(uid, token)
        setVerified(true)
    }

    if (verified) {
        return <Redirect to='/dash' />
    }

    return (
        <div className="a-components">

            <div className="a-right-component">
               <h1 className="a-head-text">Activate Account</h1>
            </div>
            
            <div className="a-left-component">
            <div className="a-head">
                <img src={Logo}/>
            </div>
            <h1 className="a-head-text-2">Verify your Account:</h1>
                     
                <button
                     className='a-btn-1'
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>

                </div>
        </div>
    )


}

export default connect(null, { verify })(Activate)