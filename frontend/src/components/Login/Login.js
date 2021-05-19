import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import './Login.css'
import {connect} from 'react-redux'
import Logo from './SoftArcLogo.jpg'
import {login,messageclear} from '../../actions/auth'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';

function Login({login,isAuthenticated,messageclear,message}) {
    
    let history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });
    
    useEffect(()=>{
        messageclear()
    },[])
    
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
        messageclear()
    };

    const [isDesktop, setDesktop] = useState(window.innerWidth <= 800);
    const updateMedia = () => {
        setDesktop(window.innerWidth <= 800);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });

      const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.log(err.message)
        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if(isAuthenticated){
        history.push("/profile")
    }



    return (
        <div className="si-components">

            <div className="si-left-component">
            <div className="si-head">
                <img src={Logo}/>
            </div>
                <div className="si-body">
                    <h1 className="si-head-text-3">Login to your Account</h1>
                     <p className="si-head-text-4">Login using social networks</p>
                     <div className="si-social-media-buttons">
                     <button onClick={continueWithGoogle} className="fa fa-google"> </button>
                     <button onClick={continueWithFacebook} className="fa fa-facebook"></button>
                    
                     </div>
                     <div className="si-wrapper">
                     <div className="si-border">OR</div>
                     </div>  
                     {message &&
                         <div className="warning-login">
                            <p>{message}</p>
                            <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
                         </div>
                         } 
                     <div className="si-form-elements">
                         <form onSubmit={e=>onSubmit(e)}>

                             <input 
                             className="si-input" 
                             type="email" 
                             name="email" 
                             placeholder="Email" 
                             value={email}
                            onChange={e => onChange(e)}
                             required
                             />

                             <input 
                             className="si-input" 
                             type="password" 
                             name="password" 
                             placeholder="Password"
                             value={password}
                             onChange={e => onChange(e)}
                             minLength = '8'
                             required
                             />
                             <input 
                             className="si-btn-1" 
                             type="submit" 
                             value="Sign In" 
                             name="submit-btn" />
                         </form>

                         <p className='si-forgot-pass'>
                             Forgot Password? <Link to='/reset-password'> Reset Password</Link>
                         </p>

                         

                     </div>

                </div>
                

            </div>
            
            <div className="si-right-component">
            
            {!isDesktop ? (
                    <div className="si-left-content">
                    <h1 className="si-head-text">New Here?</h1>
                    <p className="si-head-text-2">Sign up and start using our SoftArc.</p>
                <Link to="/signup"><button className="si-btn-2">Sign Up</button></Link>
                </div>
        
      ) : (
        <div className="si-left-content">
        <p className="si-head-text-2">
            <Link className="si-link" to="/signup">Sign up </Link> 
            and start using our SoftArc.</p>
    </div>
        
      )}
                

            </div>


        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
    
})

export default connect(mapStateToProps,{login,messageclear})(Login)
