import axios from 'api/axios';
import React, { useEffect, useState } from 'react';
import 'styles/Row.css';
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  },[fetchUrl]);

  const fetchMovieData = async () =>{
  const request = await axios.get(fetchUrl);
  setMovies(request.data.results);
  }

  const handleClick = (movie) => {
    setModalOpen(true); //modal의 기본 값을 변경
    setMovieSelected(movie); //객체 정보 넣어줌
  }

  return (
    <section className='row' key={id}>
      <h2>{title}</h2>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation //arrow 버튼 사용 유무
      pagination={{ clickable: true }} //페이지 버튼 보이게 할지
      loop={true} //반복되게 할지
      breakpoints={{ //해상도에 따른 갯수
        1378:{
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        998:{
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        625:{
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        0:{
          slidesPerView: 3,
          slidesPerGroup: 3,
        }
      }}
      >      
        {/* <div className='slider'>
        <div className='slider__arrow left'>
          <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft -= (window.innerWidth - 80)}}>
            {"<"}
          </span>
        </div> */}
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide>
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name || movie.original_title}
             />
            </SwiperSlide>
          ))}
        </div>
        {/* <div className='slider__arrow right' >
          <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft += (window.innerWidth - 80)}}>
            {">"}
          </span>
        </div>
      </div> */}
      </Swiper>


      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        //{..객체명} 객체안에 있는 것을 전부 내보내줌
      )}
    </section>
  )
}



export default Row