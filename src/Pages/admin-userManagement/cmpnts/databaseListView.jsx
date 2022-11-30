import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom';



function DatabaseListView(props) {
  const navigate = useNavigate();
  //const handleOnClick = useCallback(() => sessionStorage.setItem(), navigate(props.page, [navigate]))
  const handleOnClick = () => {
    sessionStorage.setItem("userId", props.id)
    navigate(props.page)
  }

  return (
    <div onClick={handleOnClick} className='flex text-l p-3 bg-neutral-100'>
        <div className='flex-1'>{props.id}</div>
        <div className='flex-1'>{props.firstName}</div>
        <div className='flex-1'>{props.address}</div>
        <div className='flex-1'>{props.email}</div>
        <div className='flex-1'>{props.dob}</div>
        <div className='flex-1'>{props.country}</div>
        <div className='flex-1'>{props.interests}</div>
        <div className='flex-1'>{props.role}</div>
    </div>
  )
}

export default DatabaseListView