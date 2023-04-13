import React, { useEffect, useState } from 'react'

// 일정 시간 동안 기다려 주는 함수를 만들어 주는 것

function useDebounce(value, delay) {

  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    }
  },[value,delay]);

  return debounceValue;
}

export default useDebounce