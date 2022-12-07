// the query strings for each location. works with api.js as that file creates the Axios instance. 
const config = {
  uniAdminToolServer: {
    signup_location:
      "/registerUser",
    login_location:
      "/auth",
    logout_location:
      "/logout",
    refresh_access_token_location:
      "/refresh",
    user_services_location:
      "/user",
    get_user_info_location:
      "/user/unique",
    send_user_doc_location:
      "/files",
    program_list_location:
      "/programlist",
    get_user_information_id:
      "/user/adminProfileAccess/",  
    consultantUsers:
      "/consultantUsers",
  
    get_all_files:
      "/files",

    get_file_user:
      "/files/all",
    get_all_user_files: 
      "/files",
    get_spec_user_files:
      "/consultantUsers/files",
    program_list_university_name_location:
      "/programlist/filter/title",
    program_list_grade_location:
      "/programlist/filter/grade",
    program_list_city_location:
      "/programlist/filter/city",
    program_list_province_location:
      "/programlist/filter/province",
    program_list_duration_location:
      "/programlist/filter/duration",      
    setReviewed:
      "/consultantUsers/files/reviewed"
  },
};
//35.209.74.28
module.exports = config;
