import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../helpers/withRouter";
import {FaAddressCard} from "react-icons/fa";

import UserService from "../services/user_service";
import { deleteUser, logout } from "../actions/auth";
import { fileToDataURL } from "../helpers/fileHelper";
import { setMessage } from "../actions/message";

import classes from "../css/UserProfile.module.css";
import studentLogo from "../images/studentLogo.png";
import profileLogo from "../images/profileLogo.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    // binding of all set state methods
    this.setEditing = this.setEditing.bind(this);
    this.setFiles = this.setFiles.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setDateOfBirth = this.setDateOfBirth.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setInterests = this.setInterests.bind(this);
    this.setRole = this.setRole.bind(this);
    // binding of all on change state methods
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeInterests = this.onChangeInterests.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);


    this.state = {
      f_name: "",
      l_name: "",
      address: "",
      email: "",
      dob: "",
      country: "",
      interests: "",
      role: "",
      fileName: "",
      selectedFile: null,
      fileString: "",
      editing: 0,
      files: 0,
      e_f_name: "",
      e_l_name: "",
      e_address: "",
      e_dob: "",
      e_country: "",
      e_interests: "",
      e_role: "",
    };
  }

  // gets invoked right after first render() lifecyle of React component
  componentDidMount() {
    this.getUserInformation();
  }

  // These methods are called upon when setting up user profile, calling the API
  setFirstName(firstname) {
    this.setState({
      f_name: firstname,
    });
  }
  

  setLastName(lastname) {
    this.setState({
      l_name: lastname,
    });
  }

  setAddress(address) {
    this.setState({
      address: address,
    });
  }

  setEmail(userEmail) {
    this.setState({
      email: userEmail,
    });
  }

  setDateOfBirth(dateOfBirth) {
    this.setState({
      dob: dateOfBirth,
    });
  }

  setCountry(country) {
    this.setState({
      country: country,
    });
  }

  setInterests(interests) {
    this.setState({
      interests: interests,
    });
  }

  setRole(role) {
    this.setState({
      role: role,
    });
  }

  // These methods are called upon when editing the user profile, changed the value of a form to send
  // to the api
  onChangeFirstName(e) {
    this.setState({
      f_name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      l_name: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
      dob: e.target.value,
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  onChangeInterests(e) {
    this.setState({
      interests: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  // Changes the editing state, allowing different forms to be shown whether editing or not.
  setEditing() {

    if (this.state.editing === 0) {
      this.setState({
        editing: 1,
        files: 0
      });
    } else {
      this.setState({
        editing: 0
      });
    }
    console.log(this.state.files, this.state.editing);
  }

   // Changes the editing state, allowing different forms to be shown whether editing or not.
   setFiles() {

    if (this.state.files === 0) {
      this.setState({
        files: 1,
        editing: 0
      });
    } else {
      this.setState({
        files: 0
      });
    }
    
  }

  // make API call to get information of user with current access token
  // once whole user is got, can update the state with the database fields
  getUserInformation() {
    UserService.getUserInformation()
      .then((response) => {
        this.setFirstName(response.f_name);
        this.setLastName(response.l_name);
        this.setAddress(response.address);
        this.setEmail(response.email);
        this.setDateOfBirth(response.dob);
        this.setCountry(response.country);
        this.setInterests(response.interests);
        this.setRole(response.role_id);
      });
  }
  

  // makes API call to update information based on what was changed in the editing form
  // then updates the info and closes the editing form.
  updateInformation(e) {
    e.preventDefault();

    UserService.updateUserInformation(
      this.state.email,
      this.state.f_name,
      this.state.l_name,
      this.state.address,
      this.state.dob,
      this.state.country,
      this.state.interests,
      this.state.role
    ).then(() => {
      this.setEditing();
    });
  }

  // Will delete user from the database, loging them out and deleting token.
  deleteUser() {
    //future will ask for confirmation to delete account, whihc will change state of an if
    this.props.dispatch(deleteUser(this.state.email)).then(() => {
      this.props.dispatch(logout());
      this.sendToLogin();
      window.location.reload();
    });
  }

  sendToLogin() {
    this.props.navigate("/login");
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    try {
      var fileString = fileToDataURL(this.state.selectedFile);

      setTimeout(() => {
        fileString.then((result) => {
          UserService.sendUserDocument(result);

        })
      }, 200);

    } catch (e) {
      this.props.dispatch(setMessage("No Document Selected!"));
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    const { message } = this.props;
    const { editing } = this.state;
    const { files } = this.state;

    // File content to be displayed after
    // file upload is complete
    const editProfileFormat = () => {
      if (editing === 0 && files === 0) {
        return (
          <div className={classes.rightContainer}>
          <div>
            <div>
              <button className={classes.button} onClick={this.setEditing} type='button'>Edit Profile</button>
            </div>
            <h3>Name</h3>
            <p>
              {this.state.f_name} {this.state.l_name}
            </p>
          </div>
          <div>
            <h3>Address</h3>
            <p>{this.state.address}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{this.email}</p>
            <p>{this.state.email}</p>
          </div>
          <div>
            <h3>Date of Birth</h3>
            <p>{this.state.dob}</p>
          </div>
          <div>
            <h3>Country</h3>
            <p>{this.state.country}</p>
          </div>
          <div>
            <h3>Interests</h3>
            <p>{this.state.interests}</p>
          </div>
          <div>
            <h3>Role ID</h3>
            <p>{this.state.role}</p>
          </div>
          <div>
            <h3>Files</h3>
            <input type="file" onChange={this.onFileChange} />
            {this.fileData()}
            <button className={classes.button} onClick={this.onFileUpload} type="button">Upload File</button>
          </div>
        </div>
        );
        
      } 
      else if(files === 1 && editing === 0){
        return (
          <div><p>hi</p></div>
        )
      }
      else if(editing === 1 && files !== 1) {
        return (   
          <div>        
            <div>
              <button className={classes.button} onClick={this.setEditing} type='button'>Back</button>
            </div>
            <form onSubmit={this.updateInformation}>
              <div>
                
                <h4>Current First Name: {this.state.f_name}</h4>
                <input
                  type="text"
                  placeholder={this.state.f_name}
                  value={this.state.f_name}
                  onChange={this.onChangeFirstName}
                  name="firstName"
                />

                <h4>Current Last Name: {this.state.l_name}</h4>
                <input
                  type="text"
                  placeholder={this.state.l_name}
                  value={this.state.l_name}
                  onChange={this.onChangeLastName}
                  name="lastName"
                />

                <h4>Current Address: {this.state.address}</h4>
                <input 
                  type="text" 
                  placeholder={this.state.address}
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  name="address" 
                />

                <h4>Current Date of Birth: {this.state.dob}</h4>
                <input 
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  placeholder={this.state.dob}
                  onChange={this.onChangeDateOfBirth}
                  name="dob" 
                />

                <h4>Current Country: {this.state.country}</h4>
                <input 
                  type="text" 
                  placeholder={this.state.country}
                  value={this.state.country}
                  onChange={this.onChangeCountry}
                  name="country" 
                />

                <h4>Current Interests: {this.state.interests}</h4>
                <input
                  type="text"
                  placeholder={this.state.interests}
                  value={this.state.interests}
                  onChange={this.onChangeInterests}
                  name="interests"
                />

                <h4>Current Role: {this.state.role}</h4>
                <input 
                  type="text" 
                  placeholder={this.state.role}
                  value={this.state.role}
                  onChange={this.onChangeRole}
                  name="role" 
                />

                <button className={classes.button} type="submit">
                  Confirm Changes
                </button>
              </div>
            </form>
          </div>  
        );
      }
    };

    return (
      <>
        <div className={classes.mainContainer}>
            <div className={classes.headerContainer}>
              <div className={classes.headerText}>
                <h1 className={classes.headerSign}>Hello,&nbsp; {this.state.f_name}!</h1> 
                <p>Welcome to your profile! Feel free to edit your profile or upload your documents!</p>
              </div>
              <div className={classes.headerImg}>
                <img className={classes.studentLogo} src={studentLogo} alt="logo pic"/>
              </div>
            </div>
            <div className={classes.profileContainer}>
              <div className={classes.leftContainer}>
                  <div className={classes.profileLogo}>
                    <img src={profileLogo} className={classes.profileLogo} alt="profile logo"></img>
                  </div>
                  <div className={classes.profileName}>
                    <h1>{this.state.f_name} {this.state.l_name}</h1>
                  </div>
                  <div className={classes.profileOptions}>
                    <div className={classes.profileChoice}>
                      <FaAddressCard></FaAddressCard>
                      <p>Account Overview</p>
                    </div>

                    <div onClick={this.setEditing} className={classes.profileChoice}>
                      <FaAddressCard></FaAddressCard>
                      <p>Edit Profile</p>
                    </div>

                    <div onClick={this.setFiles} className={classes.profileChoice}>
                      <FaAddressCard></FaAddressCard>
                      <p>Files</p>
                    </div>
                    
                  </div>
                </div>
                <div className={classes.rightContainer}>
                  {editProfileFormat()}
                </div>
            </div>
        </div>

        <div>
          <button 
            className={classes.button}
            style={{ margin: 50 }} 
            onClick={this.deleteUser}
            type="button"
          >
            Delete Account
          </button>
        </div>
        {/* message on sign up confirmation or error */}
        {message && (
          <div>
            <div>{message}</div>
          </div>
        )}
      </>
    );
  }
}

// This connects the react components to a Redux store
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default withRouter(connect(mapStateToProps)(UserProfile));
