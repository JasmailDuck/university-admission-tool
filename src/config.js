// the query strings for each location. works with api.js as that file creates the Axios instance. 
const config = {
  uniAdminToolServer: {
    home_location:
      "/",
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
      "/user/profile",
    send_user_doc_location:
      "/user/doc",
    program_list_location:
      "/programlist",
  },
};
//35.209.74.28
module.exports = config;
