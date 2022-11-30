import React from 'react'

function userProfileAdminView(props) {
    return (
        <div id='userContentContainer' className='flex flex-col px-5 mt-5'>

            <div id='userPersonalInformatiionContainer' className=''>

                <div className=' text-xl'>
                    User Personal Information
                </div>
                <div id='userPersonalInfoDataContainer' className='flex'>


                    <div className='flex p-2'>
                        First Name:
                        <div className='mx-2'>
                            {props.firstName}
                        </div>
                    </div>

                    <div className='flex p-2'>
                        Last Name:
                        <div className='mx-2'>
                            {props.lastName}
                        </div>
                    </div>

                    <div className='flex p-2'>
                        Address:
                        <div className='mx-2'>
                            {props.address}
                        </div>
                    </div>
                    <div className='flex p-2'>
                        Email:
                        <div className='mx-2'>
                            {props.email}
                        </div>
                    </div>
                    <div className='flex p-2'>
                        Date Of Birth:
                        <div className='mx-2'>
                            {props.dob}
                        </div>
                    </div>
                    <div className='flex p-2'>
                        Country:
                        <div className='mx-2'>
                        {props.country}
                        </div>
                    </div>
                </div>
            </div>

            <div id='userDataContainer' className=''>

                <div className=' text-xl'>
                    User Data
                </div>
                <div id='userDataContainer' className='flex'>


                    <div className='flex p-2'>
                        Interests:
                        <div className='mx-2'>
                            {props.interests}
                        </div>
                    </div>

                    
                </div>



            </div>

            <div id='userDataAdminContainer' className=''>

                <div className='text-xl'>
                    User Data Admin Access Only
                </div>


                <div id='userDataContainer' className='flex'>


                    <div className='flex p-2'>
                        Grade:
                        <div className='mx-2'>
                            {props.grade}
                        </div>
                    </div>

                    <div className='flex p-2'>
                        Role:
                        <div className='mx-2'>
                            {props.role}
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default userProfileAdminView