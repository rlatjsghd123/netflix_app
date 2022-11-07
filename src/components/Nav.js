import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Nav.scss'

function Nav() {
  const [show,setShow] = useState(false);  // 네비를 아래로 스크롤했을때 
  const [searchValue,setSearchValue] = useState("");

  const navigate = useNavigate();

  const onChange = (e) =>{
    setSearchValue(e.target.value); 
    navigate(`/search?q=${e.target.value}`);
  }
  useEffect(()=>{
    window.addEventListener("scroll", ()=>{

      if(window.scrollY > 50){
         setShow(true);
      }  else{
        setShow(false);
      }
    });
    return () =>{
      window.removeEventListener("scroll",()=>{}) // 컴포넌트가 더이상 사용되지 않을 경우에 이벤트를 삭제해주는역할인데 뭔소린지 모르겠음..
    }
  },[]); // 컴포넌트가 마운트 됬을때만 실행됨. [] <=이값이 비어있을경우
  return (
    
    <nav className={`nav ${show && 'nav_black'}`}>
        <img 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' 
        alt='Netflix logo' 
        className='nav_logo'
        onClick={()=> navigate("/")} />
        <input type="search" placeholder='영화를 검색해주세요' value={searchValue} onChange={onChange} className="nav_input" />
        <img 
        src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
        alt='userInfo'
        className='nav_avater' />
    </nav>
  )
}

export default Nav;
