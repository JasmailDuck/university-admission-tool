import config from "../config";
import apiInstance from "../api";



class FunctionService {

  getAllUniversity(){
    return apiInstance.get(config.uniAdminToolServer.program_list_location)
    .then((response) => {
      
      return response.data; 
    })
  };

  listOfUniName(universityName){

    
    return apiInstance.get(config.uniAdminToolServer.program_list_location,{
       params:{ university: universityName }
       
    })
    .then((response) => {
      
      return response.data; 
    })
  };

  listOfProgramName(programName){
    return apiInstance.post(config.uniAdminToolServer.program_list_university_name_location,{
      filterArray : programName
   })
   .then((response) => {
     
     return response.data; 
   })
  }

  userGradeRequirement(){
    return apiInstance.get(config.uniAdminToolServer.program_list_grade_location)
    .then((response) => {
      
      return response.data; 
    })
  }
}

  
export default new FunctionService();
