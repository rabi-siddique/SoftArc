import React,{useState,useEffect} from 'react'
import './SignUp.css'
import {Link,Redirect} from 'react-router-dom'
import Logo from './SoftArcLogo.jpg'
import { connect } from 'react-redux'
import { signup,messageclear } from '../../actions/auth'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import ClipLoader from "react-spinners/ClipLoader";



function SignUp({signup,message,messageclear}) {
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#000");
    const [isDesktop, setDesktop] = useState(window.innerWidth <= 800)
    const updateMedia = () => {
        setDesktop(window.innerWidth <= 800)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => window.removeEventListener("resize", updateMedia)
      })

      useEffect(()=>{
        messageclear()
    },[])

    useEffect(()=>{
        setLoading(false)
    },[message])


      const [formData, setFormData] = useState({
          fullname: '',
          email: '',
          password: '',
          re_password: ''
      })
  
      const { fullname, email, password, re_password } = formData
  
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  
      const onSubmit = e => {
          e.preventDefault()
                setLoading(!loading)
                const namearr = fullname.split(" ")
                signup(namearr[0],namearr[1], email, password, re_password)
              
    }

      const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    return (
        <div className="su-components">
         
            <div className="su-left-component">
                {!isDesktop ? (
                <div className="su-left-content">
                <h1 className="su-head-text">Hello Friend,</h1>
                <p className="su-head-text-2">If you already have an account, 
                just sign in. We've missed you.</p>
                <Link to="/login"><button className="su-btn-2">Sign In</button></Link>
                </div>
                ):
                (
                <div className="su-left-content">
                <p className="su-head-text-2">If you already have an account, 
                just <Link className="su-link" to="/login">Sign in </Link> .We've missed you.</p>
                </div>

                )}

            </div>

            <div className="su-right-component">
            <div className="su-head">
                <img src={Logo}/>
            </div>
                <div className="su-body">
                    <h1 className="su-head-text-3">Create Free Account</h1>
                    <p className="su-head-text-4">Sign up using social networks</p>
                     <div className="su-social-media-buttons">
                     <button onClick={continueWithGoogle} className="fa fa-google"> </button>
                     <button onClick={continueWithFacebook} className="fa fa-facebook"></button>
                     </div>
                     <div className="su-wrapper">
                     <div className="su-border">OR</div>
                </div>
                     {message?
                         <div className="warning-login">
                            <p>{message}</p>
                            <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
                         </div>
                    :
                     <div className="su-form-elements">
                         
                         {loading?
                                                     
                        <ClipLoader color={color}  size={150} />
                            : 
                        <form onSubmit={e => onSubmit(e)}>

                            <input
                            className='su-input'
                            type='text'
                            placeholder='Full Name*'
                            name='fullname'
                            value={fullname}
                            onChange={e => onChange(e)}
                            required
                            />

                                <input
                                className='su-input'
                                type='email'
                                placeholder='Email*'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                                />

                                <input
                                    className='su-input'
                                    type='password'
                                    placeholder='Password*'
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength='8'
                                    required
                                    />

                                <input
                                    className='su-input'
                                    type='password'
                                    placeholder='Confirm Password*'
                                    name='re_password'
                                    value={re_password}
                                    onChange={e => onChange(e)}
                                    minLength='8'
                                    required
                                />

                                <input className="su-btn-1" 
                                type="submit" 
                                value="Sign Up" 
                                name="submit-btn" />

                            </form>}

                     </div>
}

                </div>
            

            </div>

            

        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
})

export default connect(mapStateToProps, { signup,messageclear })(SignUp)
