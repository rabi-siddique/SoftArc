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
        <div>
        <section className="bg-white {-- h-screen --}">
            <div className="mx-auto flex lg:justify-center h-full flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 px-2 py-20 sm:py-40 sm:px-12 flex flex-col justify-center items-center bg-indigo-600 relative">
                    <div className="absolute left-0 top-0 pl-3 pt-3">
                        <svg width={130} height={462} xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(-180 65 231)" fill="#7F9CF5" fillRule="evenodd">
                                <rect className="hidden sm:block" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="24.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="48.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="72.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="96.059" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="120.073" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="144.088" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="168.103" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="192.117" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y={216} width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y={216} width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y={216} width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y={216} width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y={216} width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="240.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="240.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="240.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="240.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="240.015" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="264.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="264.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="264.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="264.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="264.029" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" y="288.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="31.002" y="288.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="62.003" y="288.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="93.005" y="288.044" width="6.002" height="6.005" rx="3.001" />
                                <rect className="hidden sm:block" x="124.007" y="288.044" width="6.002" height="6.005" rx="3.001" />
                                <rect y="312.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="312.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="312.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="312.059" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="312.059" width="6.002" height="6.005" rx="3.001" />
                                <rect y="336.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="336.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="336.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="336.073" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="336.073" width="6.002" height="6.005" rx="3.001" />
                                <rect y="360.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="360.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="360.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="360.088" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="360.088" width="6.002" height="6.005" rx="3.001" />
                                <rect y="384.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="384.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="384.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="384.103" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="384.103" width="6.002" height="6.005" rx="3.001" />
                                <rect y="408.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="408.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="408.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="408.117" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="408.117" width="6.002" height="6.005" rx="3.001" />
                                <rect y={432} width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y={432} width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y={432} width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y={432} width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y={432} width="6.002" height="6.005" rx="3.001" />
                                <rect y="456.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="31.002" y="456.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="62.003" y="456.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="93.005" y="456.015" width="6.002" height="6.005" rx="3.001" />
                                <rect x="124.007" y="456.015" width="6.002" height="6.005" rx="3.001" />
                            </g>
                        </svg>
                    </div>
                    <div className="flex relative z-30 flex-col justify-center px-4 md:pr-12">
                        <div className="px-2 flex flex-col items-center justify-center">
                            <svg className="w-32 h-32" id="logo" enableBackground="new 0 0 300 300" height={44} viewBox="0 0 300 300" width={43} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g>
                                    <path
                                        fill="#fff"
                                        d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                                    />
                                </g>
                            </svg>
                        </div>
                        <h3 className="text-4xl pt-8 leading-tight text-white text-center">SoftArc</h3>
                    </div>
                    <div className="absolute right-0 bottom-0">
                        <svg width="236px" height="234px" viewBox="0 0 236 234" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <polygon id="path-1" points="0 4.54747351e-13 236 4.54747351e-13 236 234 0 234" />
                            </defs>
                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="Sign-In-5" transform="translate(-487.000000, -790.000000)">
                                    <g id="Group-464" transform="translate(605.000000, 907.000000) rotate(-180.000000) translate(-605.000000, -907.000000) translate(487.000000, 790.000000)">
                                        <mask id="mask-2" fill="white">
                                            <use xlinkHref="#path-1" />
                                        </mask>
                                        <g id="Clip-450" />
                                        <path d="M1,234 C-128.785798,234 -234,128.785798 -234,-1 C-234,-130.785798 -128.785798,-236 1,-236 C130.788182,-236 236,-130.785798 236,-1 C236,128.785798 130.788182,234 1,234 Z" id="Stroke-449" stroke="#7F9CF5" strokeWidth="0.704" mask="url(#mask-2)" />
                                        <path d="M-0.5,217 C-120.620637,217 -218,119.175305 -218,-1.5 C-218,-122.175305 -120.620637,-220 -0.5,-220 C119.623015,-220 217,-122.175305 217,-1.5 C217,119.175305 119.623015,217 -0.5,217 Z" id="Stroke-451" stroke="#7F9CF5" strokeWidth="0.688" mask="url(#mask-2)" />
                                        <path d="M0.998808246,199 C-110.010672,199 -200,109.010672 -200,-1.99880825 C-200,-113.008289 -110.010672,-203 0.998808246,-203 C112.008289,-203 202,-113.008289 202,-1.99880825 C202,109.010672 112.008289,199 0.998808246,199 Z" id="Stroke-452" stroke="#7F9CF5" strokeWidth="0.672" mask="url(#mask-2)" />
                                        <path d="M0.5,182 C-100.843661,182 -183,99.3959421 -183,-2.5 C-183,-104.395942 -100.843661,-187 0.5,-187 C101.843661,-187 184,-104.395942 184,-2.5 C184,99.3959421 101.843661,182 0.5,182 Z" id="Stroke-453" stroke="#7F9CF5" strokeWidth="0.657" mask="url(#mask-2)" />
                                        <path d="M1,166 C-91.2307802,166 -166,91.2307802 -166,-1 C-166,-93.2307802 -91.2307802,-168 1,-168 C93.2331631,-168 168,-93.2307802 168,-1 C168,91.2307802 93.2331631,166 1,166 Z" id="Stroke-454" stroke="#7F9CF5" strokeWidth="0.641" mask="url(#mask-2)" />
                                        <path d="M1.49881277,149 C-81.0661515,149 -148,81.6208238 -148,-1.49880483 C-148,-84.6184335 -81.0661515,-152 1.49881277,-152 C84.0661515,-152 151,-84.6184335 151,-1.49880483 C151,81.6208238 84.0661515,149 1.49881277,149 Z" id="Stroke-455" stroke="#7F9CF5" strokeWidth="0.625" mask="url(#mask-2)" />
                                        <path d="M1,131 C-72.4538047,131 -132,71.4538047 -132,-2 C-132,-75.4538047 -72.4538047,-135 1,-135 C74.4538047,-135 134,-75.4538047 134,-2 C134,71.4538047 74.4538047,131 1,131 Z" id="Stroke-456" stroke="#7F9CF5" strokeWidth="0.609" mask="url(#mask-2)" />
                                        <path d="M-0.5,115 C-64.840925,115 -117,62.840925 -117,-1.5 C-117,-65.840925 -64.840925,-118 -0.5,-118 C63.840925,-118 116,-65.840925 116,-1.5 C116,62.840925 63.840925,115 -0.5,115 Z" id="Stroke-457" stroke="#7F9CF5" strokeWidth="0.593" mask="url(#mask-2)" />
                                        <path d="M0.99880991,98 C-53.6762956,98 -98,53.6762956 -98,-0.99880991 C-98,-55.6762956 -53.6762956,-100 0.99880991,-100 C55.6762956,-100 100,-55.6762956 100,-0.99880991 C100,53.6762956 55.6762956,98 0.99880991,98 Z" id="Stroke-458" stroke="#7F9CF5" strokeWidth="0.578" mask="url(#mask-2)" />
                                        <path d="M0.5,82 C-45.061559,82 -82,45.0639523 -82,-0.5 C-82,-46.0639523 -45.061559,-83 0.5,-83 C46.0639523,-83 83,-46.0639523 83,-0.5 C83,45.0639523 46.0639523,82 0.5,82 Z" id="Stroke-459" stroke="#7F9CF5" strokeWidth="0.562" mask="url(#mask-2)" />
                                        <path d="M1,63 C-34.898786,63 -64,33.898786 -64,-2 C-64,-37.898786 -34.898786,-67 1,-67 C36.898786,-67 66,-37.898786 66,-2 C66,33.898786 36.898786,63 1,63 Z" id="Stroke-460" stroke="#7F9CF5" strokeWidth="0.546" mask="url(#mask-2)" />
                                        <path d="M1.49880102,46 C-25.2864453,46 -47,24.2864453 -47,-2.49880102 C-47,-29.2840474 -25.2864453,-51 1.49880102,-51 C28.2840474,-51 50,-29.2840474 50,-2.49880102 C50,24.2864453 28.2840474,46 1.49880102,46 Z" id="Stroke-461" stroke="#7F9CF5" strokeWidth="0.53" mask="url(#mask-2)" />
                                        <path d="M1,30 C-16.1194383,30 -30,16.1194383 -30,-1 C-30,-18.1218042 -16.1194383,-32 1,-32 C18.1218042,-32 32,-18.1218042 32,-1 C32,16.1194383 18.1218042,30 1,30 Z" id="Stroke-462" stroke="#7F9CF5" strokeWidth="0.514" mask="url(#mask-2)" />
                                        <path d="M1.5,13 C-6.50652174,13 -13,6.50894649 -13,-1.5 C-13,-9.50894649 -6.50652174,-16 1.5,-16 C9.50894649,-16 16,-9.50894649 16,-1.5 C16,6.50894649 9.50894649,13 1.5,13 Z" id="Stroke-463" stroke="#7F9CF5" strokeWidth="0.498" mask="url(#mask-2)" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <form onSubmit={e => onSubmit(e)}
                class="w-full lg:w-1/2 flex justify-center bg-white">
                    <div class="w-full sm:w-4/6 md:w-3/6 lg:w-2/3 text-gray-800 flex flex-col justify-center px-2 sm:px-0 py-16">
                        <div class="px-2 sm:px-6">
                <h3 class="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
        Setting New Password</h3>
        <p class="mt-2 text-sm text-gray-700">
        We get it, stuff happens. Just enter your email address below and we'll send you a
        link to reset your password!
    </p>
                        </div>
            {message?
            <div className="warning-login">
            <p>{message}</p>
            <CloseIcon className="closeicon" onClick={()=>{messageclear()}}/>
            </div>
                :
                        <div class="mt-4 w-full px-2 sm:px-6">
                            {loading?
                                                 
                            <ClipLoader color={color}  size={150} />
                            : <div>
                             <div class="flex flex-col mt-8">
                                    <label for="password" class="text-lg font-semibold leading-tight">
                                        Password
                                    </label>
                                    <input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    aria-required="true" 
                                    name='new_password'
                                    value={new_password}
                                    onChange={e => onChange(e)}
                                    minLength = '8'
                                    class="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"/>
                                </div>

                                <div class="flex flex-col mt-5">
                                    <label for="password" class="text-lg font-semibold fleading-tight">
                                        Confirm Password
                                    </label>
                                    <input 
                                    id="re_password" 
                                    required aria-required="true" 
                                    name='re_new_password'
                                    value={re_new_password}
                                    onChange={e => onChange(e)}
                                    minLength='8'
                                    type="password"
                                    class="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow" />
                                </div>

                            </div>}
                        </div>
}
                        <div class="px-2 sm:px-6">
                        {
        passcheck &&
        <div className="warning-login">
            <p>Both Password Fields Should Match. Please Try Again.</p>
            <CloseIcon className="closeicon" onClick={()=>{setpasscheck(false)}}/>
        </div>
    }
                            <button type="submit" class="focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6">
                                Reset Password
                            </button>
                            <p class="mt-6 text-xs">
                                Already have an Account?{" "}
                                <Link to="/login" class="underline text-indigo-600" href="javascript: void(0)">
                                    Login 
                                </Link>
                            </p>
                            <p class="mt-6 text-xs">
                                Don't have an Account?{" "}
                                <Link to="/signup" class="underline text-indigo-600" href="javascript: void(0)">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
    )
}

const mapStateToProps = state => ({
    message: state.auth.message
})

export default connect(mapStateToProps, { reset_password_confirm,messageclear })(ResetPasswordConfirm)
