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
    FIRSTNAME_CHANGE_FAIL
    ,DARKTHEME_APPLIED,
    DARKTHEME_APPLIED_FAILED,
    LASTNAME_CHANGE_SUCCESS,
    LASTNAME_CHANGE_FAIL,
    USERNAME_CHANGE_SUCCESS,
    USERNAME_CHANGE_FAIL,
    ABOUT_CHANGE_SUCCESS,
    ABOUT_CHANGE_FAIL,
    DP_CHANGE_FAIL,
    DP_CHANGE_SUCCESS
    
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    message : "",
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case MESSAGE_CLEAR:
            return {
                ...state,
                message: ""
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                message: "Activation Email Sent to your provided Email Address."
            }
        case USER_LOADED_SUCCESS:
        case DARKTHEME_APPLIED:
        case FIRSTNAME_CHANGE_SUCCESS:
        case LASTNAME_CHANGE_SUCCESS:
        case USERNAME_CHANGE_SUCCESS:
        case ABOUT_CHANGE_SUCCESS:
        case DP_CHANGE_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                message:"Invalid Email Address or Password"

            }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('datareceived');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                

            }
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                message:payload
            }
        case FIRSTNAME_CHANGE_FAIL:
        case ACTIVATION_FAIL:
            return {
                ...state,
                message:"Task Failed. Try Again Later."
            }
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state,
                message:payload
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                message:"Password Reset Link Sent To Your Provided Email Address."
        }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
                message:"Password Changed Successfully."
        }
        case ACTIVATION_SUCCESS:
            return {
                    ...state,
                    message:"Account Verification Success.Login to Continue."
            }
        case DARKTHEME_APPLIED_FAILED:
        case LASTNAME_CHANGE_FAIL:
        case FIRSTNAME_CHANGE_FAIL:
        case USERNAME_CHANGE_FAIL:
        case ABOUT_CHANGE_FAIL:
        case DP_CHANGE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};