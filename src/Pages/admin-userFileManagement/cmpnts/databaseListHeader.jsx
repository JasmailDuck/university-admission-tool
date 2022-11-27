import React from 'react'

function databaseListHeader(props) {
  return (
    <div className='flex text-xl px-3 py-5'>
        <div className='flex-1'>{props.email}</div>
        <div className='flex-1'>{props.id}</div>
        <div className='flex-1'>{props.fileName}</div>
        <div className='flex-1'>{props.file}</div>
    </div>
  )
}

export default databaseListHeader