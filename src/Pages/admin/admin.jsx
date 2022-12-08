import React from 'react'
import ADMINTOOLITEMGEN from './cmpnts/adminToolItemGen'
import USERMANAGEMENTICON  from '../../assets/manage-icon.svg'
import FILEMANAGEMENTICON from '../../assets/database-file-icon.svg'

//Animations
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;



const USERMANAGEMENTPAGE = '/admin/usermanagement'
const FILEMANAGEMENTPAGE = '/admin/filemanagement'





function admin() {
  return (
    //This would be under nav
    <FadeInUpDiv>
        <div className='h-screen w-screen bg-neutral-100'>

          <div className='h-full w-full flex flex-col justify-center items-center adminHome'>
              <div className='p-10 text-4xl'>
                  ADMIN DASHBOARD
              </div>

              <div id='adminToolsContentContainer' className='flex flex-1 mx-20 mb-20 p-2'>
                  <ADMINTOOLITEMGEN toolName = "User Management" iconPicture = {USERMANAGEMENTICON} page = {USERMANAGEMENTPAGE}/>
                  <ADMINTOOLITEMGEN toolName = "File Management" iconPicture = {FILEMANAGEMENTICON} page = {FILEMANAGEMENTPAGE}/>
                  
              </div>
          </div>

        </div>
    </FadeInUpDiv>
    
  )
}

export default admin