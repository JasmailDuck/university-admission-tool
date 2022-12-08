import config from "../config";
import apiInstance from "../api";

class FileService {

  getFileByID(id) {
    
    return apiInstance
      .post(config.uniAdminToolServer.get_file_user,
        {"id": id})
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

  deleteFileAdminOnly(id) {
    return apiInstance
      .delete(config.uniAdminToolServer.delete_File + id)
      .then((response) => {
        return response.data
      })
  }


}

export default new FileService();