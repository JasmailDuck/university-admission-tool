import config from "../config";
import apiInstance from "../api";
<<<<<<< Updated upstream
import TokenService from "./token_service";
=======
import { Component } from "react";


>>>>>>> Stashed changes

class FunctionService extends Component {
  

  programsList = (university_name) => {
    return apiInstance.post(config.uniAdminToolServer.program_list_location, {
      "university": university_name
    }, {
      headers: {
        'Authorization': `${TokenService.getLocalAccessToken}` 
      }
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

  
export default new FunctionService;
