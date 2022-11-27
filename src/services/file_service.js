import config from "../config";
import apiInstance from "../api";

class FileService {

  getUserInformationLocation() {
    return apiInstance
      .get(config.uniAdminToolServer.user_services_location)
      .then((response) => {
  
        return response.data;
      });
  }

  getAllUserFiles() {
    return apiInstance
      .get(config.uniAdminToolServer.get_all_files)
      .then((response) => {
  
        return response.data;
      });
  }


}

export default new FileService();