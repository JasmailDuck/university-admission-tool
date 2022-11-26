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

  updateUserInformation(email, f_name, l_name, address, dob, country, interests, role) {
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
          "roleid": role,
        })
  }

  sendUserDocument(file) {
    return apiInstance
      .post(config.uniAdminToolServer.send_user_doc_location,
        {
          "files": file,
        })
        .then((response) => {
          return response.data;
        });
  }

  // Used to check what role the user has
  getUserType() {
    return apiInstance.get(config.uniAdminToolServer.confirm_user_type_location);
  };

}

export default new UserService();