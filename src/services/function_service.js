import config from "../config";
import apiInstance from "../api";
<<<<<<< Updated upstream


=======
import { Component } from "react";


>>>>>>> Stashed changes

class FunctionService extends Component {
  

  programsList = (university_name) => {

    
    return apiInstance.get(config.uniAdminToolServer.program_list_location,{
       params:{ university: university_name }
       
    })
    .then((response) => {
<<<<<<< Updated upstream
=======
      
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
>>>>>>> Stashed changes
  
      return response.data;
    });
  };
  
}

  
export default FunctionService;
