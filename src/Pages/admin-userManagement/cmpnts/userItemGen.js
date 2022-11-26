import React from 'react'
import USER_SERVICE from '../../../services/user_service';
import DATABASELISTVIEW from '../cmpnts/databaseListView'



async function userItemGen()  {
        return (await USER_SERVICE.getUserInformation().then((response) => {
            console.log(response)
            //response.map((item,index)=>{
            return <DATABASELISTVIEW id="1" firstName="Test" lastName="Test" address="123 somestreetWay" email="lol@gmail.com" dob="11/11/1111" country="Canada" interests="sports" role="Student"  />     
            //})
        }))

    }


export default userItemGen