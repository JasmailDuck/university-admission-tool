import React from 'react'
import ADMINTOOLITEMGEN from './cmpnts/adminToolItemGen'
import USERMANAGEMENTICON  from '../../assets/manage-icon.svg'
import FILEMANAGEMENTICON from '../../assets/database-file-icon.svg'

function admin() {
  return (
    //This would be under nav
    <div className='h-screen w-screen bg-neutral-100 '>

        <div className='h-full w-full flex flex-col'>
            <div className='p-10 text-4xl'>
                ADMIN DASHBOARD
            </div>

            <div id='adminToolsContentContainer' className='flex flex-1 mx-20 mb-20 p-2'>
                <ADMINTOOLITEMGEN toolName = "User Management" iconPicture = {USERMANAGEMENTICON}/>
                <ADMINTOOLITEMGEN toolName = "File Management" iconPicture = {FILEMANAGEMENTICON}/>
            </div>
        </div>

    </div>
  )
}

export default admin