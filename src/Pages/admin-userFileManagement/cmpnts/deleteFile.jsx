import React from 'react'
import FILE_SERVICE from '../../../services/file_service'
import { useNavigate } from 'react-router-dom'

function DeleteFile() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center'>
            Delete User's File
            <button onClick={()=> {
                FILE_SERVICE.deleteFileAdminOnly(parseInt(sessionStorage.getItem("fileID"))).then((response) =>{
                    navigate(-1)
                })
            }} className='p-2 bg-neutral-200 text-red-600 rounded-2xl mx-5'>
              Delete
            </button>
          </div>
  )
}

export default DeleteFile