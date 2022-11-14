import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../fbase';


function LoginPage() {
  const [error,setError] = useState("");
  const [id,setId] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);  // 네비를 아래로 스크롤했을때 

  const navigate = useNavigate();

  const onChange = (e) =>{
    const {target: {name,value}} = e;
     if(name === "id"){
         setId(value);
     }else if(name =="pwd"){
         setPassword(value);
     }
 }
 const onSubmit = (e) =>{
  e.preventDefault();
  signInWithEmailAndPassword(AuthService, id, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    navigate("/");
    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    if(errorMessage == "Firebase: Error (auth/invalid-email)."){
      setError("이메일형식이어야 합니다.")
  } else if(errorMessage == "Firebase: Error (auth/user-not-found)."){
    setError("아이디,비밀번호를 확인해주세요.")
  }
  });
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
    <section className='login'>
      <div className='login_box'>
        <h2 className='login_title'>로그인</h2>
        <form className='login_form' onSubmit={onSubmit}>
          <input type="text" placeholder='이메일주소' name='id' value={id} onChange={onChange} />
          <input type="password" placeholder='비밀번호' name='pwd' value={password} onChange={onChange} /> 
          <Link to={'/SignUp'} className='sign_up_link' ><span className='error_msg'>{error}</span><span>회원가입</span></Link>
          <input type="submit" value="로그인" className='submit_login' />
        </form>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default LoginPage;