import React, { useEffect } from 'react'

function useOnClickOutside(ref,handler) {
  useEffect(() => {
    console.log('ref->',ref); //ref.current는 div.modal(창)

    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)){
        //모달 창이 닫히지 않는 경우, 이벤트 타겟이 되는 애가 모달창 안에 있을 경우 안 닫힘
        console.log('event.target=>',event.target);
        return;
      } else {
        // 모달창이 닫히는 경우
        handler(event);
      }
    };
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener);
  },[ref,handler])

}

export default useOnClickOutside