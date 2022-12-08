import React from 'react'
import { Component } from 'react'
import UserService from '../../../services/user_service';



import USERPROFILEADMINVIEW from './userProfileAdminView';













class userProfileEditorAdmin extends Component {


  constructor(props) {

    super(props);


    this.getUserInformation = this.getUserInformation.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
    this.deleteUser = this.deleteUser.bind(this);


    this.setEditing = this.setEditing.bind(this);
    this.setViewing = this.setViewing.bind(this);

    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setDateOfBirth = this.setDateOfBirth.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.setInterests = this.setInterests.bind(this);
    this.setRole = this.setRole.bind(this);
    this.setGrade = this.setGrade.bind(this);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeInterests = this.onChangeInterests.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeGrade = this.onChangeGrade.bind(this);


    this.state = {
      id: sessionStorage.getItem("userId"),
      f_name: "",
      l_name: "",
      address: "",
      email: "",
      dob: "",
      country: "",
      interests: "",
      role: "",
      grade: "",
      editing: 0,
      viewing: 1,
      e_f_name: "",
      e_l_name: "",
      e_address: "",
      e_dob: "",
      e_country: "",
      e_interests: "",
      e_role: "",
      e_grade: ","
    };
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

  setGrade(grade) {
    this.setState({
      grade: grade,
    });
  }

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

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
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

  onChangeGrade(e) {
    this.setState({
      grade: e.target.value,
    });
  }

  setEditing() {

    if (this.state.editing === 0) {
      this.setState({
        editing: 1,
        viewing: 0,
      });
    } else {
      this.setState({
        editing: 0,
        viewing: 0,
      });
    }
  }

  setViewing() {

    if (this.state.viewing === 0) {
      this.setState({
        editing: 0,
        viewing: 1
      });
    } else {
      this.setState({
        editing: 0,
        viewing: 0
      });
    }
  }

  getUserInformation() {
    UserService.getUserInformationByID(this.state.id)
      .then((response) => {
        this.setFirstName(response.f_name|| "");
        this.setLastName(response.l_name|| "");
        this.setAddress(response.address|| "");
        this.setEmail(response.email|| "");
        this.setDateOfBirth(response.dob|| "");
        this.setCountry(response.country|| "");
        this.setInterests(response.interests|| "");
        this.setRole(response.role_id|| 0);
        this.setGrade(response.grade || 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateInformation(e) {
    e.preventDefault();
    console.log(e);
    UserService.updateUserInformation(
      this.state.email,
      this.state.f_name,
      this.state.l_name,
      this.state.address,
      this.state.dob,
      this.state.country,
      this.state.interests,
      this.state.role,
      this.state.grade
    )
    .catch((error) => {console.log(error);})
    .then (() => {
      this.setViewing();
    })
  }

  deleteUser() {

  }



  componentDidMount() {
    this.getUserInformation();


  }


  render() {

    //const { message } = this.props;
    const { editing } = this.state;
    const { viewing } = this.state;


    const viewProfile = () => {

      if (viewing) {
        return (
          <USERPROFILEADMINVIEW
            firstName={this.state.f_name}
            lastName={this.state.l_name}
            address={this.state.address}
            email={this.state.email}
            dob={this.state.dob}
            country={this.state.country}
            interests={this.state.interests}
            grade={this.state.grade}
            role={this.state.role}
          />
        )
      }
    }
    const editProfile = () => {
      if (editing) {
        return (
          <form onSubmit={this.updateInformation}>
            <div id='userContentContainer' className='flex flex-col px-5 mt-5'>

              <div id='userPersonalInformatiionContainer' className=''>

                <div className=' text-xl'>
                  User Personal Information
                </div>
                <div id='userPersonalInfoDataContainer' className='flex'>


                  <div className='flex p-2'>
                    First Name:
                    <input
                      type="text"
                      placeholder={this.state.f_name}
                      value={this.state.f_name}
                      onChange={this.onChangeFirstName}
                      name="firstName"
                    />
                  </div>

                  <div className='flex p-2'>
                    Last Name:
                    <input
                      type="text"
                      placeholder={this.state.l_name}
                      value={this.state.l_name}
                      onChange={this.onChangeLastName}
                      name="lastName"
                    />
                  </div>

                  <div className='flex p-2'>
                    Address:
                    <input
                      type="text"
                      placeholder={this.state.address}
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      name="address"
                    />
                  </div>
                  <div className='flex p-2'>
                    Email:
                    <div className='mx-2'>
                      {this.state.email}
                    </div>
                  </div>
                  <div className='flex p-2'>
                    Date Of Birth:
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      placeholder={this.state.dob}
                      onChange={this.onChangeDateOfBirth}
                      name="dob"
                    />
                  </div>
                  <div className='flex p-2'>
                    Country:
                    <input
                      type="text"
                      placeholder={this.state.country}
                      value={this.state.country}
                      onChange={this.onChangeCountry}
                      name="country"
                    />
                  </div>
                </div>
              </div>

              <div id='userDataContainer' className=''>

                <div className=' text-xl'>
                  User Data
                </div>
                <div id='userDataContainer' className='flex'>


                  <div className='flex p-2'>
                    Interests:
                    <input
                      type="text"
                      placeholder={this.state.interests}
                      value={this.state.interests}
                      onChange={this.onChangeInterests}
                      name="interests"
                    />
                  </div>


                </div>



              </div>

              <div id='userDataAdminContainer' className=''>

                <div className='text-xl'>
                  User Data Admin Access Only
                </div>


                <div id='userDataContainer' className='flex'>


                  <div className='flex p-2'>
                    Grade:
                    <input
                      type="text"
                      placeholder={this.state.grade}
                      value={this.state.grade}
                      onChange={this.onChangeGrade}
                      name="grade"
                    />
                  </div>

                  <div className='flex p-2'>
                    Role:
                    <input
                      type="text"
                      placeholder={this.state.role}
                      value={this.state.role}
                      onChange={this.onChangeRole}
                      name="role"
                    />
                  </div>

                </div>

              </div>
              <button className='p-3 mx-3 bg-neutral-100 rounded-2xl' type="submit">
                Confirm Changes
              </button>
            </div>

          </form>
        )
      }
    }


    return (

      <div className='h-full w-full bg-neutral-100 '>

        <div className='h-full w-full flex flex-col'>
          <div className='p-10 text-4xl'>
            ADMIN DASHBOARD {'>'} USER MANAGEMENT
          </div>

          <div id='adminToolsContentContainer' className='h-full flex flex-col flex-1 mx-20 mb-20 p-2'>

            <div className='flex text-2xl mb-5'>
              Profile Editor for User: {this.state.f_name}
            </div>

            <div className=' flex-1 bg-white rounded-2xl drop-shadow-2xl p-2'>

              <div id='profileOptions' className='' >
                <div className=' text-xl mb-5'>
                  Profile Options
                </div>

                <div id='optionsButtonContainer' className='text-lg'>
                  <button
                    onClick={this.setViewing}
                    className='p-3 mx-3 bg-neutral-100 rounded-2xl'>
                    View Profile
                  </button>

                  <button
                    onClick={this.setEditing}
                    className='p-3 mx-3 bg-neutral-100 rounded-2xl'>
                    Edit Profile
                  </button>

                  <button className='p-3 mx-3 bg-neutral-100 rounded-2xl'>Delete Profile</button>
                  
                </div>
              </div>

              <div id='contentContainer'>
                {viewProfile() || editProfile()}
              </div>



            </div>
          </div>
        </div>

      </div>
    )
  }
}



export default userProfileEditorAdmin