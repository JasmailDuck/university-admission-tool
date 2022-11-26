import React from 'react'

function databaseListHeader(props) {
  return (
    <div className='flex text-xl px-3 py-5'>
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

export default databaseListHeader