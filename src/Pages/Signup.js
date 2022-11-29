import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "../helpers/withRouter";
import { signup } from "../actions/auth";

import classes from "../css/Signup.module.css";
import signupBG from "../images/signup.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.sendToLogin = this.sendToLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    // controls state of Signup.
    this.state = {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
      successful: false,
    };
  }

  // Changes state value of first name as info is typed into the input field
  onChangeFirstName = (e) => {
    this.setState({
      f_name: e.target.value,
    });
  };

  // Changes state value of last name as info is typed into the input field
  onChangeLastName = (e) => {
    this.setState({
      l_name: e.target.value,
    });
  };

  // Changes state value of email as info is typed into the input field
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // Changes state value of password as info is typed into the input field
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  // Changes state value of confirm password as info is typed into the input field
  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  // Called when user clicks sign up button, sending the entered information
  // to an API, which checks if they are valid, and sends them to the database
  handleSignup(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    if (
      this.state.f_name !== "" &&
      this.state.l_name !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.confirmPassword !== ""
    ) {
      this.props
        .dispatch(
          signup(
            this.state.f_name,
            this.state.l_name,
            this.state.email,
            this.state.password
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          this.sendToLogin();
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  sendToLogin() {
    this.props.navigate("/login");
  }

  // Checks email when each character is typed in by the user, to see if valid.
  // updates a p tag with what is still needed for it to be valid.
  handleEmailValidation = (evnt) => {
    const emailInputValue = evnt.target.value.trim();
    const emailInputFieldName = evnt.target.name;
    //for email
    if (emailInputFieldName === "email") {
      let emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{3,}(?:\.{1}[a-zA-Z0-9-]{2,})*$/;
      let errMsg = "";
      if (emailInputValue.length === 0) {
        errMsg = "";
      } else if (!emailInputValue.match(emailRegex)) {
        errMsg = "Email is not valid";
      }
      this.setState({
        emailErrorMessage: errMsg,
      });
    }
  };

  // Checks password when each character is typed in by the user, to see if valid.
  // updates a p tag with what is still needed for it to be valid.
  handlePasswordValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      }
      this.setState({
        passwordErrorMessage: errMsg,
      });
    }
    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        this.state.confirmPassword.length > 0)
    ) {
      if (this.state.confirmPassword !== this.state.password) {
        this.setState({
          confirmPasswordErrorMessage: "Confirm password is not matched",
        });
      } else {
        this.setState({
          confirmPasswordErrorMessage: "",
        });
      }
    }
  };
  

  // renders HTML to the web page, and enables reading props and state and return our JSX code to the root of the app.
  render() {
    const { message } = this.props;

    return (
      <>
        <div className={classes.mainContainer}>
          <div className={classes.leftContainer}>
            <img className={classes.signupBG} src={signupBG} alt="signup pic"/>
          </div>

          <div className={classes.rightContainer}>
            <h1 className={classes.signin_title}>Create a Shirah Profile</h1>

            <div className={classes.form}>
              <form onSubmit={this.handleSignup}>
                {!this.state.successful && (
                  <div className={classes.inputContainer}>
                    {/* First name input */}
                    <label htmlFor="firstName">
                      <p>First Name*</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="firstName"
                      value={this.state.f_name}
                      onChange={this.onChangeFirstName}
                      required
                    />

                    {/* Last name input */}
                    <label htmlFor="lastName">
                      <p>Last Name*</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={this.state.l_name}
                      onChange={this.onChangeLastName}
                      required
                    />

                    {/* Email input */}
                    <label htmlFor="email">
                      <p>Email*</p>
                    </label>
                    <input
                      type="email"
                      placeholder="Email@email.com"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      onKeyUp={this.handleEmailValidation}
                      required
                    />
                    <p className={classes.input_error}>
                      {this.state.emailErrorMessage}
                    </p>

                    {/* Password input */}
                    <div>
                      <label htmlFor="password">
                        <p>Password*</p>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" 
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        onKeyUp={this.handlePasswordValidation}
                        required
                      />
                      <p className={classes.input_error}>
                        {this.state.passwordErrorMessage}
                      </p>
                    </div>

                    {/* Password again input */}
                    <div>
                      <label htmlFor="confirmPassword">
                        <p>Confirm Password*</p>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" 
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                        onKeyUp={this.handlePasswordValidation}
                        required
                      />
                      <p className={classes.input_error}>
                        {this.state.confirmPasswordErrorMessage}
                      </p>
                    </div>

                    {/* Signup button */}
                    <button className={classes.confirm_button}>Sign up</button>
                    <div >
                        <p className={classes.others}>Already have an account? <a href="/login">Log in here!</a> </p>
                    </div>
                  </div>
                )}

                {/* message on sign up confirmation or error */}
                {message && (
                  <div>
                    <div>{message}</div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        
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

export default withRouter(connect(mapStateToProps)(Signup));
