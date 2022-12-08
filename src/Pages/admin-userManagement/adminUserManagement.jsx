
import DATABASELISTHEADER from './cmpnts/databaseListHeader'

import { Component } from 'react';

import USER_SERVICE from '../../services/user_service'

import DATABASELISTVIEW from './cmpnts/databaseListView'

//Animations
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;

const USER_PROFILE_VIEWER_ADMIN_PAGE = '/admin/usermanagement/userEditor'

class adminUserManagement extends Component {

    

    state = {
        test: []
    }

    componentDidMount() {
        USER_SERVICE.getUserInformationLocation().then((response) => {
            this.setState({test: response})
            console.log(this.state.test);
        })
    }
    
   
//<DATABASELISTVIEW id="1" firstName="Test" lastName="Test" address="123 somestreetWay" email="lol@gmail.com" dob="11/11/1111" country="Canada" interests="sports" role="Student"  /> 

render() {
    return (
    <FadeInUpDiv>
    <div className='h-full w-full bg-neutral-100 userHome '>

        <div className='h-full w-full flex flex-col'>
            <div className='p-10 text-4xl'>
                ADMIN DASHBOARD
            </div>

            <div id='adminToolsContentContainer' className='h-full flex flex-col flex-1 mx-20 mb-20 p-2'>
                
                <div className='flex text-2xl mb-5'>
                    User Management
                </div>

                <div className=' flex-1 bg-white rounded-2xl drop-shadow-2xl p-2 overflow-y-scroll'>
                    
                <DATABASELISTHEADER id="ID" firstName="First Name" lastName="Last Name" address="Address" email="Email" dob="Date Of Birth" country="Country" interests="Interests" role="Role"  />

                {
                    this.state.test.map(testd =>
                        <DATABASELISTVIEW id={testd.userID} firstName={testd.f_name} lastName={testd.l_name} address={testd.address} email={testd.email} dob={testd.dob} country={testd.country} interests={testd.interests} role={testd.role_id} page={USER_PROFILE_VIEWER_ADMIN_PAGE}  />
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

export default adminUserManagement