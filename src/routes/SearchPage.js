import axios from 'api/axios';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'styles/SearchPage.css';
import DetailPage from './DetailPage';

function SearchPage() {

  const [searchResults,setSearchResults] = useState([]);
  const [detailOpen, setDetailOpen] = useState(false);

  const navigatie = useNavigate();
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery(); //?q=name
  const searchTerm = query.get("q"); //q에 해당되는 값을 가져와라 q=name이므로 name을 가져옴
  
  const debounceSearchTerm = useDebounce(searchTerm, 500); //hook함수 만든 것을 가져와서 값을 지정
  console.log("searchTerm=>",searchTerm); // 결과값 name

  //글자가 없을 때는 홈으로 돌아가기는 어떻게?


  useEffect(() => {
    if(debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm])


  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      setSearchResults(request.data.results);
    } catch (error) {
    }
  }

  const handleClick = (movie) =>{
    setDetailOpen(true);
  }

  const renderSearchResults = () =>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className='movie'>
                {/* movie에 key값 추가하기 */}
                <div className='movie__column-poster' onClick={() => navigatie(`/${movie.id},${handleClick(movie)}`)}>
                  <img src={movieImageUrl} alt={movie.title} className='movie__poster'  />
                  {/* 영화 id값을 가져와서 DetailPage로 변경 */}
                  <p className='movie__name'>{movie.title || movie.name}</p>
                </div>
              </div>
            )
         }
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
              찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return renderSearchResults();
}

export default SearchPage;