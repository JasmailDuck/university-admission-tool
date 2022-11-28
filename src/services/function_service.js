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

  listOfProgramName(programName){
    console.log(programName);
    return apiInstance.get(config.uniAdminToolServer.university_name,{
      body: { filterArray : programName } 
      
   })
   .then((response) => {
     
     return response.data; 
   })
  }

}

  
export default new FunctionService();
