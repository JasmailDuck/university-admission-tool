import React from 'react'

function databaseListView(props) {
  return (
    <div className='flex text-l p-3 bg-neutral-100'>
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

export default databaseListView