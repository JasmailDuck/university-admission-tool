import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom';

//Animations
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;




function DatabaseListViewFile(props) {
  const navigate = useNavigate();
  //const handleOnClick = useCallback(() => sessionStorage.setItem(), navigate(props.page, [navigate]))
  const handleOnClick = () => {
    sessionStorage.setItem("fileID", props.id)
    navigate(props.page)
  }

  
  //console.log(dataURLToFile(Buffer.from(props.file, 'base64').toString('ascii'), props.fileName));
  return (
    
    <FadeInUpDiv>
      <div onClick={handleOnClick} className='flex text-l p-3 bg-neutral-100'>
        <div className='flex-1'>{props.email}</div>
        <div className='flex-1'>{props.id}</div>
        <div className='flex-1'>{props.fileName}</div>
        <div className='flex-1'>{props.file}</div>
      </div>
    </FadeInUpDiv>
    
  )
}

export default DatabaseListViewFile