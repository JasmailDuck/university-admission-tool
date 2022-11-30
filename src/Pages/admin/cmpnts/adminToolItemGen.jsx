import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom';

function AdminToolItemGen(props) {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate(props.page), [navigate]);

  return (
    <div onClick={handleOnClick} className='w-64 h-64 rounded-2xl p-5 flex flex-col m-5 bg-white drop-shadow-xl'>

        <div className='flex-1 flex flex-col h-2/3'>
           <img src={props.iconPicture} alt="" className='justify-self-center self-center flex-1 h-2/3' /> 
        </div>

        <div className='flex-1 text-2xl flex items-end justify-center'>
            {props.toolName}
        </div>
        
    </div>
  )
}

export default AdminToolItemGen