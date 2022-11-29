import React, { Component } from "react";
import UserService from "../services/user_service";
import function_service from "../services/function_service.js";
import DrawTable from "./consultants/drawTable"



class Consultants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.pullFromAPI()
  }

   pullFromAPI() {
     UserService.getUserInformation().then((response) => {
      function_service.consultantUsers(response.userID).then((apiResponse) =>{
        var updatedUser = [];
        apiResponse.map((user) =>{
          updatedUser.push(user)
        })
         this.setState({users: updatedUser})
    });
    });
  }


  render() {
    return (
      <div>
        <header>
          <h1>Consultants</h1>
            <div className = "Table">
              <DrawTable users={this.state.users}></DrawTable>
            </div> 
        </header>
      </div>
    );
  }
}
export default Consultants;
