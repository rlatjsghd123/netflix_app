import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/searchPage.scss';
import { useDebounce } from '../hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  //console.log('useLacation()', useLocation());
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  },[debouncedSearchTerm]);

  const fetchSearchMovie = async(searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`);
        //console.log("request",request)
        setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

    const renderSearchResults = () => {
      return searchResults.length > 0 ? (
        <section className='search_container'>
          {searchResults.map(movie => {
            if(movie.backdrop_path !== null && movie.media_type !== "person"){
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <>
                <div className='movie' key={movie.id}>
                    <div className='movie_column_poster' onClick={()=>navigate(`/detail/${movie.id}`)}>
                        <img src={movieImageUrl} 
                            alt={movie.title || movie.name || movie.original_name}
                            className="movie_poster" />
                    </div>
                  <h2 className='movie_title'>{movie.title || movie.name || movie.original_name}</h2>
                </div>
                </>
              )
            }
          })}
        </section>
      ) : (
        <section className='no_results'>
          <div className='no_results_text'>
            <p>
              찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
            </p>
          </div>
        </section>
      )
    }

    return renderSearchResults();
}

export default SearchPage