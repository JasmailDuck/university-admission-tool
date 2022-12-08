
import DATABASELISTHEADER from './cmpnts/databaseListHeader'

import { Component } from 'react';

import FILE_SERVICE from '../../services/file_service';
import { dataURLToFile } from '../../helpers/fileHelper';
import {Buffer} from 'buffer';
import DATABASELISTVIEWFILE from './cmpnts/databaseListViewFile';
//Animations
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;

const FILEPAGE = "/admin/filemanagement/view"





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
    

fileType(userFile) {
    try {
        let type = dataURLToFile(Buffer.from(userFile.file, 'base64').toString('ascii'), userFile.file_name).type
        return type
    } catch (error) {
        return "UNKNOWN FILE TYPE"
    }
}


render() {
    return (
    <FadeInUpDiv>
            <div className='w-full bg-neutral-100 fileHome'>

                <div className='w-full flex flex-col'>
                    <div className='p-10 text-4xl'>
                        ADMIN DASHBOARD
                    </div>

                    <div id='adminToolsContentContainer' className='flex flex-col flex-1 mx-20 mb-20 p-2'>
                        
                        <div className='flex text-2xl mb-5'>
                            File Management
                        </div>

                        <div className=' flex-1 bg-white rounded-2xl drop-shadow-2xl p-2 overflow-y-scroll'>
                            
                        <DATABASELISTHEADER id="File ID" email="Email" fileName="File Name" file="File"  />

                        
                        {
                            this.state.files.map(userFile =>
                                <DATABASELISTVIEWFILE
                                id={userFile.fileID} 
                                email={userFile.email} 
                                fileName={userFile.file_name} 
                                page={FILEPAGE} 
                                file={ this.fileType(userFile) }   />
                            )
                        }
                        
                        
                        </div>
                    </div>
                </div>

            </div>
    </FadeInUpDiv>
    
  )
}
  
}

export default adminFileManagement