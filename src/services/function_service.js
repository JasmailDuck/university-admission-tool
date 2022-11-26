import config from "../config";
import apiInstance from "../api";
import React, { Component } from "react";



class FunctionService extends Component {
  

  listOfUniName(universityName){

    
    return apiInstance.get(config.uniAdminToolServer.program_list_location,{
       params:{ university: universityName }
       
    })
    .then((response) => {
      return response.data; 
    })
  };

  consultantUsers = (consultantID) => {
    return apiInstance.get(config.uniAdminToolServer.consultantUsers, {
      params:{consultant_id: consultantID}
    }).then((response) => {
      return response.data;
    })
  };
}
  
export default new FunctionService();
