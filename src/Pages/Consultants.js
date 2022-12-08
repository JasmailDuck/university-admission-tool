import React, { Component } from "react";
import UserService from "../services/user_service";
import function_service from "../services/function_service.js";
import DrawTable from "./consultants/drawTable"
import '../css/Consultant.css';

import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.3s ${FadeInUpAnimation};
`;


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
      <FadeInUpDiv>
        <div className="consultantContainer">
        <header>
          <h1 className="title">Consultants</h1>
            <div className = "Table">
              <DrawTable users={this.state.users}></DrawTable>
            </div> 
        </header>
      </div>
      </FadeInUpDiv>
      
    );
  }
}
export default Consultants;
