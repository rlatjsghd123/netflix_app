import React, { useRef } from 'react'
import useOnclickOutside from '../hooks/useOnclickOutside';
import '../styles/MovieModal.scss'


function MovieModal({setModalOpen,backdrop_path,title,overview,name,release_date,first_air_date,vote_average}) {
    const ref = useRef(); // DOM을 직접 선택해야할경우에 useRef 사용 
    useOnclickOutside(ref, ()=>{ setModalOpen(false);});
  return (
    <div className='presentation'>
        <div className='wrapper_modal'>
            <div ref={ref} className='modal'>
                <span className='modal_close' onClick={()=>setModalOpen(false)}>X</span>
                <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} className="modal_poster_img" alt={title ? title:name} />
                <div className='modal_content'>
                    <p className='modal_details'>
                        <span className='Modal_user_perc'>100% for you</span>{"  "}
                        {release_date ? release_date : first_air_date}
                        
                    </p>
                    <h2 className='modal_title'>{title ? title:name}</h2>
                    <p className='modal_average'>평점: {vote_average}</p>
                    <p className='modal_summary'>{overview}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieModal;
