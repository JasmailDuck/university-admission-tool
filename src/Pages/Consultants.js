import React, { Component } from "react";
import UserService from "../services/user_service";
import function_service from "../services/function_service.js";
class Consultants extends Component {
  constructor(props) {
    super(props);
    this.drawList = this.drawList.bind(this);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    this.test();
  }

  test() {
    UserService.getUserInformation().then((response) => {
      console.log(function_service);
      function_service.consultantUsers(response.userID).then((apiResponse) => {
        this.setState({ users: apiResponse });
        this.drawList();
      });
    });
  }

  drawList = () => {
    this.state.users.forEach((user) => {
      // make HTML
      console.log(user);
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1>Consultants</h1>
          <div className="users">
            {this.state.users.map((actualUser) => {
              return <h3>{actualUser.f_name}</h3>;
            })}
          </div>
        </header>
      </div>
    );
  }
}
export default Consultants;
