import React, { useEffect } from 'react'

function useOnclickOutside(ref, handler) {
  useEffect(()=>{
    const listener = (event) =>{
        if(!ref.current || ref.current.contains(event.target)){
            return;
        }
        handler(event)
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () =>{ // 컴포넌트가 언마운트 될때 이벤트리스너들을 삭제
        document.removeEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);
    };

  },[ref, handler])
}

export default useOnclickOutside