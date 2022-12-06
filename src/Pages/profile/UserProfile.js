import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../helpers/withRouter";
import { FaAddressCard } from "react-icons/fa";

import UserService from "../../services/user_service";
import { deleteUser, logout } from "../../actions/auth";
import { fileToDataURL } from "../../helpers/fileHelper";
import { setMessage } from "../../actions/message";
import classes from "../../css/UserProfile.module.css";
import studentLogo from "../../images/studentLogo.png";
import profileLogo from "../../images/profileLogo.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    // binding of all set state methods
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setDateOfBirth = this.setDateOfBirth.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setInterests = this.setInterests.bind(this);
    this.setRole = this.setRole.bind(this);
    this.setInformation = this.setInformation.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.setFiles = this.setFiles.bind(this);
    this.openConfirmBox = this.openConfirmBox.bind(this);
    this.closeConfirmBox = this.closeConfirmBox.bind(this);
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
      confirmBox: false,
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

  // Changes the information state, allowing the profile information page to show.
  setInformation() {
    if (this.state.editing === 1 || this.state.files === 1) {
      this.setState({
        editing: 0,
        files: 0,
      });
    }
  }

  // Changes the editing state, allowing the edit information form to show.
  setEditing() {
    if (this.state.editing === 0) {
      this.setState({
        editing: 1,
        files: 0,
      });
    }
  }

  // Changes the files state, allowing the uploading files page to show.
  setFiles() {
    if (this.state.files === 0) {
      this.setState({
        editing: 0,
        files: 1,
      });
    }
  }

  openConfirmBox() {
    this.setState({
      confirmBox: true,
    });
  }

  closeConfirmBox() {
    this.setState({
      confirmBox: false,
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

  // make API call to get information of user with current access token
  // once whole user is got, can update the state with the database fields
  getUserInformation() {
    UserService.getUserInformation().then((response) => {
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
      this.setInformation();
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
    if (this.state.selectedFile === null) {
      this.props.dispatch(
        setMessage("No Document Selected! (only pdfs accepted)")
      );
    } else if (this.state.selectedFile.type === "application/pdf") {
      var fileString = fileToDataURL(this.state.selectedFile);

      setTimeout(() => {
        fileString.then((result) => {
          UserService.sendUserDocument(result, this.state.selectedFile.name);
        });
      }, 200);
    } else {
      this.props.dispatch(
        setMessage("Wrong Document Selected! (only pdfs accepted)")
      );
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
    const { confirmBox } = this.state;

    // Enables the transition for the confirmation box when deleting account
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    // File content to be displayed after
    // file upload is complete
    const editProfileFormat = () => {
      if (editing === 0 && files === 0) {
        return (
          <div className={classes.accountOverview}>
            <h1>Account Overview</h1>
            <h2>Profile</h2>
            <div className={classes.accountItems}>
              <h1>Name</h1>
              <p>
                {this.state.f_name} {this.state.l_name}
              </p>
            </div>
            <div className={classes.accountItems}>
              <h1>Email</h1>
              <p>{this.state.email}</p>
            </div>
            <div className={classes.accountItems}>
              <h1>Birthday</h1>
              <p>{this.state.dob}</p>
            </div>
            <div className={classes.accountItems}>
              <h1>Country/Origin</h1>
              <p>{this.state.country}</p>
            </div>
          </div>
        );
      } else if (files === 1 && editing === 0) {
        return (
          <div className={classes.filesContainer}>
            <h3>Files</h3>
            <input
              type="file"
              accept="application/pdf"
              onChange={this.onFileChange}
            />
            {this.fileData()}
            <button
              className={classes.button}
              onClick={this.onFileUpload}
              type="button"
            >
              Upload File
            </button>
            {message && (
              <div>
                <div>{message}</div>
              </div>
            )}
          </div>
        );
      } else if (editing === 1 && files === 0) {
        return (
          <div className={classes.editProfileContainer}>
            <form onSubmit={this.updateInformation}>
              <div className={classes.editForm}>
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
              <h1 className={classes.headerSign}>
                Hello,&nbsp; {this.state.f_name}!
              </h1>
              <p>
                Welcome to your profile! Feel free to edit your profile or
                upload your documents!
              </p>
            </div>
            <div className={classes.headerImg}>
              <img
                className={classes.studentLogo}
                src={studentLogo}
                alt="logo pic"
              />
            </div>
          </div>
          <div className={classes.profileContainer}>
            <div className={classes.leftContainer}>
              <div className={classes.profileLogo}>
                <img
                  src={profileLogo}
                  className={classes.profileLogo}
                  alt="profile logo"
                ></img>
              </div>
              <div className={classes.profileName}>
                <h1>
                  {this.state.f_name} {this.state.l_name}
                </h1>
              </div>
              <div className={classes.profileOptions}>
                <div
                  onClick={this.setInformation}
                  className={classes.profileChoice}
                >
                  <FaAddressCard></FaAddressCard>
                  <p>Account Overview</p>
                </div>

                <div
                  onClick={this.setEditing}
                  className={classes.profileChoice}
                >
                  <FaAddressCard></FaAddressCard>
                  <p>Edit Profile</p>
                </div>

                <div onClick={this.setFiles} className={classes.profileChoice}>
                  <FaAddressCard></FaAddressCard>
                  <p>Files</p>
                </div>

                <div
                  onClick={this.openConfirmBox}
                  className={classes.profileChoice}
                  id={classes.deleteAccount}
                >
                  <FaAddressCard></FaAddressCard>
                  <p>Delete Account</p>
                </div>
              </div>
            </div>
            <div className={classes.rightContainer}>{editProfileFormat()}</div>
          </div>
        </div>

        {confirmBox && (
          <div>
            <Dialog
              open={true}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.closeConfirmBox}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Are you sure you want to delete your account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Deleting your account will remove all your saved personal
                  information, including all your uploaded documents. They will
                  not be recoverable, and you must make another account and
                  upload them again.
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.confirmBox}>
                <Button onClick={this.closeConfirmBox}>DO NOT DELETE</Button>
                <Button onClick={this.deleteUser}>I AGREE TO DELETE</Button>
              </DialogActions>
            </Dialog>
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
