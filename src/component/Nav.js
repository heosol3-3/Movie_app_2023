import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "styles/Nav.css";

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigatie = useNavigate();
  // 주소창에 있는 주소를 가져오는 것은 useLocation

  const onChange = (e) => {
    setSearchValue(e.target.value);
    navigatie(`/search?q=${e.target.value}`);
  }

  useEffect(() => {
    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 50){
        setShow(true);
      }else{
        setShow(false);
      }
    });
    return ()=>{ //컴포넌트 사용하지 않을 때
      window.removeEventListener("scroll",()=>{})
    }
  },[])

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='netfilx logo' className='nav__logo' onClick={()=>{window.location.href = "/Movie_app_2023.git/"}} />
      <input type='search' placeholder='영화를 검색해주세요' className='nav__input' 
      onChange={onChange} value={searchValue} />
      <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' alt='user' className='nav__avatar' />
      </nav>
  )
}

export default Nav