import React, { useRef, useState } from 'react'
import {FaUserEdit,FaEdit} from 'react-icons/fa'
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../fbase';
import '../styles/Info.scss'
import { useNavigate } from 'react-router-dom';

function Info() {
    const [edit,setEdit] = useState(true);
    const [nickName,setNickName] = useState("User");
    const navigate = useNavigate();
    const nickNameOnChange = (e) =>{
        setNickName(e.target.value);
        console.log(e.target.value)
    }
    const nickNameEdit = () =>{
        setEdit(prev=> !prev);
    }
    const onLogOut = () =>{
        AuthService.signOut();
        navigate("/");
    }
  return (
    <div className='info_box'>
        <img 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' 
        alt='Netflix logo' 
        className='nav_logo'
        onClick={()=> (window.location.href= "/netflix_app")} />
        <div className='user_info'>
                <label htmlFor='user_pic'><FaUserEdit className='edit' /></label>
                <input type="file" id='user_pic' accept="image"  capture='user'/>
                <img 
                src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
                alt='userInfo'
                className='big_avater' /> 
                {edit ? 
                <>
                    <p className='user_name'>{nickName}<FaEdit onClick={()=> setEdit(false)} /></p>
                </> 
                    :
                <div className='info_edit'>
                    <input type="text" className='info_input' value={nickName} onChange={nickNameOnChange} placeholder='변경할 닉네임' />
                    <button className='edited' onClick={nickNameEdit}>수정</button>
                </div> 
                }
        </div>    
        <p className='logout' onClick={onLogOut}>로그아웃</p>
    </div>
  )
}

export default Info