import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import {withRouter} from "../helpers/withRouter";
import { connect } from "react-redux";

import { login } from "../actions/auth";
import loginBG from "../images/login.png";

import classes from "../css/front.module.css";

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
  };

  // Changes state value of password as info is typed into the input field
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  };

  // Called when user clicks log in button with filled information, sending the entered information to an API.
  // which then checks if they are valid, and sends them to the database
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    })

    const { dispatch } = this.props;

    if (this.state.email !== "" && this.state.password !== "") {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          this.sendToHome();
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  sendToHome() {
    this.props.navigate("/");
  }

  // renders HTML to the web page, and enables reading props and state and return our JSX code to the root of the app.
  render() {

    //Message used to be here
    const {isLoggedIn} = this.props;

    if (isLoggedIn) {
      return <Navigate to="/userProfile" />
    }

    return (
      <>

      <div className={classes.mainContainer}>
      <div className={classes.leftContainer}>
        <img className={classes.loginBG} src={loginBG} alt="login pic"/>
      </div>

      <div className={classes.rightContainer}>
          <div className={classes.formContainer}>
            <form className={classes.form} onSubmit={this.handleLogin}>
    
                <label className={classes.loginLogo} htmlFor="loginsign">
                    <p>Log In</p>
                </label>
                {/*Email input*/}
                <div className={classes.emailContainer}>
                    <label htmlFor="email">
                        <p>Email</p>
                    </label>
                    <input type="text"
                     placeholder="johndoe@abc.ca" 
                    name="email" value={this.state.email} onChange={this.onChangeEmail} required />
                </div>
                
                {/*Password input*/}
                <div className={classes.passwordContainer}>
                    <label htmlFor="password">
                        <p>Password</p>
                    </label>
                    <input type="password" 
                     placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" 
                     classNmae="login_pass" name="password" value={this.state.password} onChange={this.onChangePassword} required />
                </div>
            

                {/* Login button */}
                <div className={classes.loginButtonContainer}>
                    <button className={classes.confirm_button} disabled={this.state.loading}>
                    {this.state.loading && (
                    <span></span>
                        )}
                    <span>Login</span>
                </button>
                </div>

                {/*Others*/}
                <div className={classes.othersContainer}>
                    <p>Don't have an account? <a href="?">Sign Up here!</a> </p>
                </div>
                
            </form>
          </div>
      </div>

        {/* message on why login did not work */}
        {/*message && (
              <div>
                <div>
                  {message}
                </div>
              </div>
            )*/}
      </div>

      
    </>
    )
  }
}

// This connects the react components to a Redux store
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default withRouter(connect(mapStateToProps)(Login));
