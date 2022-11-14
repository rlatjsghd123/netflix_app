import React, { useEffect, useState } from 'react'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../fbase';
import Footer from '../components/Footer';
import '../styles/SignUp.scss'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [show,setShow] = useState(false);  // 네비를 아래로 스크롤했을때 
    const [error,setError] = useState("");
    const [id,setId] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
  
    const onChange = (e) =>{
       const {target: {name,value}} = e;
        if(name === "id"){
            setId(value);
        }else if(name =="pwd"){
            setPassword(value);
        }
    }
    const scrollShow = () =>{
      window.addEventListener("scroll", ()=>{
        if(window.scrollY > 50){
           setShow(true);
        }  else{
          setShow(false);
        }
        return () =>{
          window.removeEventListener("scroll",()=>{}) // 컴포넌트가 더이상 사용되지 않을 경우에 이벤트를 삭제해주는역할인데 뭔소린지 모르겠음..
        }
    })
  }
  const onSubmit = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(AuthService, id, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("회원가입이 완료되었습니다.")
        navigate("/");
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    if(errorMessage == "Firebase: Error (auth/invalid-email)."){
        setError("이메일형식이어야 합니다.")
    }else if(errorMessage == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        setError("비밀번호는 6자리 이상이어야 합니다.")
    }else if(errorMessage == "Firebase: Error (auth/email-already-in-use)."){
        setError("이미 가입된 아이디입니다.")
    }
  });
  }
  
    useEffect(()=>{
      scrollShow();
    },[]); // 컴포넌트가 마운트 됬을때만 실행됨. [] <=이값이 비어있을경우
  return (
    <>
    <nav className={`nav ${show && 'nav_black'}`}>
    <img 
    src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' 
    alt='Netflix logo' 
    className='nav_logo'
    onClick={()=> (window.location.href= "/netflix_app")} />
    </nav>
    <section className='sign_up'>
      <div className='sign_up_box'>
        <h2 className='sign_up_title'>회원가입</h2>
        <form className='sign_up_form' onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={id} name="id" placeholder='이메일주소' />
          <input type="password" onChange={onChange} value={password} name="pwd" placeholder='비밀번호' /> 
          <span className='error_msg'>{error}</span>
          <input type="submit" value="회원가입" className='submit_login' />
        </form>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default SignUp