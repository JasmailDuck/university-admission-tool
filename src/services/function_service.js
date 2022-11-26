import config from "../config";
import apiInstance from "../api";



class FunctionService {

  listOfUniName(universityName){

    
    return apiInstance.get(config.uniAdminToolServer.program_list_location,{
       params:{ university: universityName }
       
    })
    .then((response) => {
      
      return response.data; 
    })
  };

  
}

  
export default new FunctionService();
