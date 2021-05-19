import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    MESSAGE_CLEAR,
    FIRSTNAME_CHANGE_SUCCESS,
    FIRSTNAME_CHANGE_FAIL,
    DARKTHEME_APPLIED,
    DARKTHEME_APPLIED_FAILED,
    LASTNAME_CHANGE_SUCCESS,
    LASTNAME_CHANGE_FAIL,
    USERNAME_CHANGE_SUCCESS,
    USERNAME_CHANGE_FAIL,
    ABOUT_CHANGE_SUCCESS,
    ABOUT_CHANGE_FAIL,
    DP_CHANGE_SUCCESS,
    DP_CHANGE_FAIL
} from './types';

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        console.log("reading")
        console.log(formBody)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            console.log("in the catch")
            console.log(err.name)
            console.log(err.message)
            console.log(err.stack)
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        } catch (err) {
            console.log("Errors:")
            console.log(err)
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
        return true
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        return false
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const messageclear = () => dispatch => {
    dispatch({
        type: MESSAGE_CLEAR
    });
};


export const applyDark = (uid,darktheme) => async dispatch => {

    let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;

        try {
            await axios.patch(url,{"darktheme":!darktheme})
            dispatch({
                type: DARKTHEME_APPLIED
            });
        } catch (err) {
            
            dispatch({
                type: DARKTHEME_APPLIED_FAILED
            });
        }
    
    
  }

export const changeFirstName = (uid,first_name) => async dispatch => {

    let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;

    try {
        await axios.patch(url,{"first_name":first_name})
        dispatch({
            type: FIRSTNAME_CHANGE_SUCCESS
        });
    } catch (err) {
        
        dispatch({
            type: FIRSTNAME_CHANGE_FAIL
        });
}
    
    
  }

export const changeLastName = (uid,last_name) => async dispatch => {

    let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;

    try {
        await axios.patch(url,{"last_name":last_name})
        dispatch({
            type: LASTNAME_CHANGE_SUCCESS
        });
    } catch (err) {
        
        dispatch({
            type: LASTNAME_CHANGE_FAIL
        });
}

    
}

export const changeUsername = (uid,username) => async dispatch => {

    let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;

    try {
        await axios.patch(url,{"username":username})
        dispatch({
            type: USERNAME_CHANGE_SUCCESS
        });
    } catch (err) {
        
        dispatch({
            type: USERNAME_CHANGE_FAIL
        });
}
   
}


export const changeAbout = (uid,about) => async dispatch => {

let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;

    try {
        await axios.patch(url,{"about":about})
        dispatch({
            type: ABOUT_CHANGE_SUCCESS
        });
    } catch (err) {
        
        dispatch({
            type: ABOUT_CHANGE_FAIL
        });
}

}

export const changeDP = (uid,image) => async dispatch => {

    let url = `${process.env.REACT_APP_API_URL}/profile/update/${uid}/`;
    const config = {
        headers:{"content-type":"multipart/form-data",
        accept:'application/json'}}
    
    
    try {
        await axios.patch(url,image,config)
        dispatch({
            type: DP_CHANGE_SUCCESS
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: DP_CHANGE_FAIL
        });
}

}