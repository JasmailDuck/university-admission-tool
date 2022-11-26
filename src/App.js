import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";

import navbarClasses from "./css/Navbar.module.css";
import footerClasses from "./css/Footer.module.css";

import Home from "./Pages/Home";
import Programs from "./Pages/Programs";
//import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserProfile from "./Pages/UserProfile";
import AdminProfile from "./Pages/UserProfile";
import ADMINUSERMANAGEMENT from "./Pages/admin-userManagement/adminUserManagement";
import ADMIN from "./Pages/admin/admin";
import LOGIN from "./Pages/FrontEndLogIn";
import { logout } from "./actions/auth";
import EventBus from "./helpers/EventBus";
import { history } from "./helpers/history";
import Consultants from "./Pages/Consultants";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      userRole: undefined,
    };
  }

  // gets invoked right after first render() lifecyle of React component
  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }


  render() {
    const { currentUser, userRole } =
      this.state;

    // checks what kind of user is logged in, and will direct them to the according profile
    const CheckProfile = () => {
      if (currentUser && userRole) {
        return (
          <nav className={navbarClasses.NavBtn}>
            <Link 
              to="/adminProfile"
            >
              <FaUserCircle className={navbarClasses.Profile} />
            </Link>
          </nav>
        );
      } else if (currentUser) {
        return (
          <nav className={navbarClasses.NavBtn}>
            <Link 
              to="/userProfile"
            >
              <FaUserCircle className={navbarClasses.Profile} />
            </Link>
          </nav>
        );
      }
    };

    //all the pages that are in the website. Each has a different route leads to
    //a page guided by the nav bar.
    return (
      <BrowserRouter location={history.location} navigator={history}>
        <div className={navbarClasses.Nav}>
          <FaBars className={navbarClasses.Bars} />

          {/* This is the Home link*/}
          <div className={navbarClasses.NavMenu}>
            <Link 
              className={navbarClasses.NavLink} 
              to="/" 
              activestyle="true"
            >
              Home
            </Link>
          </div>

          {/* Change this later! right now its showing if not current user */}
          {currentUser && (
            <div className={navbarClasses.NavMenu}>
              <Link
                className={navbarClasses.NavLink}
                to="/programs"
                activestyle="true"
              >
                Programs
              </Link>
            </div>
          )}
          <div className={navbarClasses.NavMenu}>
            <Link className={navbarClasses.NavLink} to="/Consultants" activestyle="true">
              Consultants
            </Link>
          </div>

          {/* if current user is not logged in, will show signup and login on navbar  */}

          {!currentUser ? (
            <div className={navbarClasses.NavMenu}>
              <nav className={navbarClasses.NavBtn}>
                <Link 
                  className={navbarClasses.NavBtnLink} 
                  to="/signup"
                >
                  Sign up
                </Link>
              </nav>
              <nav className={navbarClasses.NavBtn}>
                <Link 
                  className={navbarClasses.NavBtnLink} 
                  to="/login"
                >
                  Login
                </Link>
              </nav>
              
            </div>
          ) : (
            /* is current user is logged in, will show log out and profile on navbar  */
            <div className={navbarClasses.NavMenu}>
              <nav className={navbarClasses.NavBtn}>
                <Link
                  className={navbarClasses.NavBtnLink}
                  to="/login"
                  onClick={this.logOut}
                >
                  Log out
                </Link>
              </nav>
              <nav className={navbarClasses.NavBtn}>
                <Link className={navbarClasses.NavBtnLink} to="/admin/usermanagement">
                  UserManage
                </Link>
              </nav>

              {CheckProfile()}
            </div>
          )}
        </div>
      
      
        

        {/* Footer will go below this point! */}
        <footer className={footerClasses.footer}>
          <div className={footerClasses.links}>
            <p><a href="?">Terms of Use</a></p>
            <p>|</p>
            <p><a href="?">Privacy</a></p>
            <p>|</p>
            <p><a href="?">Accessibility</a></p>
            <p>|</p>
            <p><a href="?">Support</a></p>
            <p>|</p>
            <p>Copyright &#169; 2022 <a href="?">Shirah</a> All rights reserved.</p>
          </div>
        </footer>
        
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
            <Route path="/admin/usermanagement" element={<ADMINUSERMANAGEMENT/>} />
            <Route path="/adminDashboard" element={<ADMIN/>}/>
            <Route path="/login" element={<LOGIN />} />
            <Route path="/consultants" element={<Consultants/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
