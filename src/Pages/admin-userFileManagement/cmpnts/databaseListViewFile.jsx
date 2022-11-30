import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom';




function DatabaseListViewFile(props) {
  const navigate = useNavigate();
  //const handleOnClick = useCallback(() => sessionStorage.setItem(), navigate(props.page, [navigate]))
  const handleOnClick = () => {
    sessionStorage.setItem("fileID", props.id)
    navigate(props.page)
  }

  
  //console.log(dataURLToFile(Buffer.from(props.file, 'base64').toString('ascii'), props.fileName));
  return (
    
    <div onClick={handleOnClick} className='flex text-l p-3 bg-neutral-100'>
        <div className='flex-1'>{props.email}</div>
        <div className='flex-1'>{props.id}</div>
        <div className='flex-1'>{props.fileName}</div>
        <div className='flex-1'>{props.file}</div>
    </div>
  )
}

export default DatabaseListViewFile