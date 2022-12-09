import React, { Component } from "react";
import { withRouter } from "../helpers/withRouter";
import { connect } from "react-redux";

import { login } from "../actions/auth";
import loginBG from "../images/login.png";
import logoIMG from "../images/testIcon.png";
import classes from "../css/front.module.css";

import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeInUpAnimation = keyframes`${fadeIn}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    // controls state of Login.
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  // Changes state value of email as info is typed into the input field
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  // Changes state value of password as info is typed into the input field
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  // Called when user clicks log in button with filled information, sending the entered information to an API.
  // which then checks if they are valid, and sends them to the database
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;

    if (this.state.email !== "" && this.state.password !== "") {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          //this.sendToProfile();
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  sendToProfile() {
    this.props.navigate("/userProfile");
  }

  // renders HTML to the web page, and enables reading props and state and return our JSX code to the root of the app.
  render() {
    const { message } = this.props;

    return (
      <>
        <FadeInUpDiv>
        <div className={classes.mainContainer}>
          <div className={classes.leftContainer}>
            <img className={classes.loginBG} src={loginBG} alt="login pic" />
          </div>

          <div className={classes.rightContainer}>
            <div className={classes.formContainer}>
            <img className={classes.logoIMG} src={logoIMG} alt="Logo Pic" />
              <form className={classes.form} onSubmit={this.handleLogin}>
                <label className={classes.loginLogo} htmlFor="loginsign">
                  <p>Log In</p>
                </label>
                {/*Email input*/}
                <div className={classes.emailContainer}>
                  <label htmlFor="email">
                    <p>Email</p>
                  </label>
                  <input
                    type="text"
                    placeholder="johndoe@abc.ca"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required
                  />
                </div>
                {/*Password input*/}
                <div className={classes.passwordContainer}>
                  <label htmlFor="password">
                    <p>Password</p>
                  </label>
                  <input
                    type="password"
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    className="login_pass"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required
                  />
                </div>
                {/* message on log in confirmation or error */}
                {message && (
                  <div>
                    <div className={classes.errorMessage}>{message}</div>
                  </div>
                )}
                {/* Login button */}
                <div className={classes.loginButtonContainer}>
                  <button
                    className={classes.confirm_button}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && <span></span>}
                    <span>Login</span>
                  </button>
                </div>
                {/*Others*/}
                <div className={classes.othersContainer}>
                  <p>
                    Don't have an account? <a href="/signup">Sign Up here!</a>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        </FadeInUpDiv>
      </>
    );
  }
}

// This connects the react components to a Redux store
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
