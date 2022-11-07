import axios from '../api/axios';
import requests from '../api/requests';
import React, { useEffect, useState } from 'react'
import '../styles/banner.scss'
import styled from 'styled-components'

function Banner() {
    const [movie,setMovie] = useState([]);
    const [isClicked,setIsClicked] = useState(false);
    
    const fetchDate = async() =>{
        // 현재 상영중인 영화 정보 request로 가져옴
      const request =  await axios.get(requests.fetchNowPlaying);

        // request의 영화정보중 랜덤으로 id하나를 지정
      const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length + 0)
      ].id;

    //   id값을 넣어 id값에 맞는 영화정보를 상세하게 가져옴 (videos정보를 어케 가져온건데 .. params에 저렇게 쓰며 추가되는걸 어찌알아내가)
      const {data:movieDetail} = await axios.get(`movie/${movieId}`,{params:{append_to_response: "videos"}})
      
      setMovie(movieDetail);
    }
    useEffect(()=>{
        fetchDate();
    },[])
    
    const trincate = (str, n) =>{
        return str?.length > n ? str.substr(0, n-1) + '...' : str;
    }

    if(!isClicked){ 
    return (
    <header className='banner' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
    backgroundPosition: "top center",
    backgroundSize: "cover"}}>
        <div className='banner_contents'>
            <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>
            <div className='banner_buttons'>
                <button onClick={()=> setIsClicked(true)} className='banner_button play'>Play</button>
                <button className='banner_button info'>More Information</button>
            </div>
            <p className='banner_description'>
                {trincate(movie.overview, 100)}
            </p>
        </div>
        <div className='banner_fadeBottom'></div>
    </header>
    )
    }else{
    return(
       <Container>
            <HomeContainer>
                <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} width="640" height="360" frameborder="0" allow="autoplay; fullscreen" title='youTube video player' allowFullScreen></Iframe>
            </HomeContainer>
       </Container>
      )  
    }
}
const Container = styled.div`
display:flex;
justify-content:column;
align-items:center;
width:100%;
height:100vh;
`;
const HomeContainer = styled.div`
    width:100%;
    height:100%;
`;
const Iframe = styled.iframe`
    width:100%;
    height:100%;
    z-index: -1;
    opacity: 0.65;
    border:none;
    &::after{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
`;
export default Banner;
