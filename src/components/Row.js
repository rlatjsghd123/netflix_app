import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import '../styles/Row.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import MovieModal from './MovieModal';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




function Row({title,id,fetchUrl,LargeRow}) {
    const [movies,setMovies] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});


    useEffect(()=>{
        fetchMovieData();
    },[fetchUrl])


    const fetchMovieData = async() =>{
       const request =  await axios.get(fetchUrl);
       setMovies(request.data.results);
    }


    const handkeClick = (movie) =>{
        setModalOpen(true);
        setMovieSelected(movie);
        console.log(movieSelected)
    }
  return (
    <section className='row'>
        <h2 className='row_title'>{title}</h2>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}//loop 기능을 사용할건가
        breakpoints={{
            1378:{
                slidesPerView: 6, // 하ㄴ번에 보이는 슬라이드 개수
                slidesperGroup:  6, // 몇개씩 슬라이드 할지
            },
            998:{
                slidesPerView: 5, // 하ㄴ번에 보이는 슬라이드 개수
                slidesperGroup:  5, // 몇개씩 슬라이드 할지
            },
            652:{
                slidesPerView: 4, // 하ㄴ번에 보이는 슬라이드 개수
                slidesperGroup:  4, // 몇개씩 슬라이드 할지
            },
            0:{
                slidesPerView: 3, // 하ㄴ번에 보이는 슬라이드 개수
                slidesperGroup:  3, // 몇개씩 슬라이드 할지
            },
        }}
        navigation // arrow버튼 사용유무
        pagination={{clickable: true}}//페이지 버튼 보이게 할것인지
        >
        {/* <div className='slider'>
            <div className='slider_arrow left'>
                <span onClick={()=>{document.getElementById(id).scrollLeft-= (window.innerWidth - 80)}} className='arrow'>
                    {"<"}
                    </span>
            </div> */}
            <div id={id} className="row_posters">{movies.map((movie) => <SwiperSlide><img key={movie.id} src={`https://image.tmdb.org/t/p/original${LargeRow ? movie.poster_path : movie.backdrop_path}`} className={`row_poster ${LargeRow && 'row_posterLarge'}`} alt={movie.title || movie.name || movie.original_name} onClick={()=>handkeClick(movie)} /></SwiperSlide>)}</div>
            {/* <div className='slider_arrow right'>
                <span onClick={()=>{document.getElementById(id).scrollLeft+= (window.innerWidth - 80)}} className='arrow'>
                    {">"}
                    </span>
            </div>
        </div> */}
        </Swiper>
        {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  )
}

export default Row;
