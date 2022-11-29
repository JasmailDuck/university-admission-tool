import config from "../config";
import apiInstance from "../api";

class UserService {

  getUserInformationLocation() {
    return apiInstance
      .get(config.uniAdminToolServer.user_services_location)
      .then((response) => {
  
        return response.data;
      });
  }

  getUserInformation() {
    return apiInstance
      .get(config.uniAdminToolServer.get_user_info_location)
      .then((response) => {
  
        return response.data;
      });
  }

  getUserInformationByID(id) {
    return apiInstance
    .get(config.uniAdminToolServer.get_user_information_id + id)
    .then((response) => {
      return response.data
    })
  }

  updateUserInformation(email, f_name, l_name, address, dob, country, interests, role, grade) {
    
    return apiInstance
      .post(config.uniAdminToolServer.user_services_location,
        {
          "userEmail": email,
          "firstName": f_name,
          "lastName": l_name,
          "address": address,
          "dob": dob,
          "country": country,
          "interests": interests,
          "roleid": parseInt(role),
          "grade": parseInt(grade)
        })
  }

  sendUserDocument(file,fileName) {
    return apiInstance
      .post(config.uniAdminToolServer.send_user_doc_location,
        {
          "file": file,
          "file_name": fileName
        })
        .then((response) => {
          return response.data;
        });
  }

  getUserFiles() {
    return apiInstance.get(config.uni)
  }

  // Used to check what role the user has
  getUserType() {
    return apiInstance.get(config.uniAdminToolServer.confirm_user_type_location);
  };

  getAllFiles(userEmail) {
    return apiInstance.get(config.uniAdminToolServer.get_spec_user_files, {
      params:{email: userEmail}
    }).then( (resp) => {
      return resp.data
    });
  }

}

export default new UserService();