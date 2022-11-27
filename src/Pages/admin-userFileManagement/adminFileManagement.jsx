
import DATABASELISTHEADER from './cmpnts/databaseListHeader'

import { Component } from 'react';

import FILE_SERVICE from '../../services/file_service';


import DATABASELISTVIEWFILE from './cmpnts/databaseListViewFile';

//const USER_PROFILE_VIEWER_ADMIN_PAGE = '/admin/usermanagement/userEditor'

class adminFileManagement extends Component {

    

    state = {
        files: []
    }

    componentDidMount() {
        FILE_SERVICE.getAllUserFiles().then((response) => {
            this.setState({files: response})
        })
    }
    
   


render() {
    return (
    <div className='h-full w-full bg-neutral-100 '>

        <div className='h-full w-full flex flex-col'>
            <div className='p-10 text-4xl'>
                ADMIN DASHBOARD
            </div>

            <div id='adminToolsContentContainer' className='h-full flex flex-col flex-1 mx-20 mb-20 p-2'>
                
                <div className='flex text-2xl mb-5'>
                    File Management
                </div>

                <div className=' flex-1 bg-white rounded-2xl drop-shadow-2xl p-2 overflow-y-scroll'>
                    
                <DATABASELISTHEADER id="File ID" email="Email" fileName="File Name" file="File"  />

                {
                    this.state.files.map(userFile =>
                        <DATABASELISTVIEWFILE id={userFile.fileID} email={userFile.email} fileName={userFile.file_name} file="{userFile.file}"   />
                    )
                }
                
                   
                </div>
            </div>
        </div>

    </div>
  )
}
  
}

export default adminFileManagement