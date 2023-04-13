import axios from 'api/axios';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'styles/DetailPage.css';

function DetailPage({setDetailOpen}) {
  
  const [movie, setMovie] = useState([]);
  let {movieId} = useParams();

  useEffect(() => {
    fetchData();
  },[movieId])

  const fetchData =  async () => {
    const request = await axios.get(`/movie/${movieId}`);
    console.log("request=>",request);
    setMovie(request.data);
    console.log('setMovie=>',setMovie)
  };
  const ref = useRef();

  useOnClickOutside(ref, () => {setDetailOpen(false)})

  if(!movie) return <div> .... loding </div>
  return (
    <div className='detail__wrap'>
      <div className='detail_inner'>
        <div className='detail' ref={ref}>
          <span className='detail_close' onClick={() => setDetailOpen(false)}>X</span>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title || movie.name || movie.original_name || movie.original_title} className='detail__original-img' />
            <div className='detail__content'>
              <h2 className='detail__title'>{movie.title ? movie.title : movie.name}</h2>
              <p className='detail__overview'>{movie.overview}</p>
            </div>
        </div>
      </div>
    </div>
  )
}
// 주소창에 있는 정보는 노출이 되어있지만 가져와서 사용 가능
export default DetailPage;