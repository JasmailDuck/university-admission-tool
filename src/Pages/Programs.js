import React, { Component } from "react";
import function_service from "../services/function_service";
import "../css/Programs.page.css"
// For the drop down box - university name
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// This is for the University Card 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

//import { MultiSelect } from "react-multi-select-component";

import Multiselect from "multiselect-react-dropdown";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


//Animations
// This is for loading animation 
import CircularProgress from '@mui/material/CircularProgress';
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeInUp}`;
const FadeInUpDiv = styled.div`
  animation: 1.45s ${FadeInUpAnimation};
`;



class Programs extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.handleUniversityName = this.handleUniversityName.bind(this); 
    this.handleProgramName = this.handleProgramName.bind(this);
    this.handleCity = this.handleCity.bind(this); 
    this.handleProvince = this.handleProvince.bind(this); 
    this.handleDuration = this.handleDuration.bind(this); 
    this.setData = this.setData.bind(this);
    this.setYear = this.setYear.bind(this); 
    this.setListOfUniName= this.setListOfUniName.bind(this);
    this.setListOfProgram= this.setListOfProgram.bind(this);
    this.setListOfCity= this.setListOfCity.bind(this); 
    this.setListOfProvince= this.setListOfProvince.bind(this); 
    this.setLoading = this.setLoading.bind(this); 
    this.getUserGradeReq= this.getUserGradeReq.bind(this); 
    this.getProgramInformation = this.getProgramInformation.bind(this);
    
    // When the website is first launch all university and there programs should be displayed 
    // The university search filter will handle one university at a time , there shold be  a list of all the university name 
    // The program search filter should be multiple select checkbox where the user can select different programs(Such as CS or Math)
    // The user grade filter will be a clickable button which will show all the minimum requirements(Handled back end )

    // controls state of Programs.
    this.state = {
      loading : true, 
      listOfUniName:[],
      listOfProgram:[],
      listOfProvince:[],
      listOfCity:[],
      data: [],
      setUniversityProgram: [],
      setCity: [],
      setProvince: [],
      setUniversityName: "",
      checkedYear: [false,false],
      setYear:[]
    };

  }

  componentDidMount() {
    this.getProgramInformation();
  }
  
  
  // 
  setData(programInfo){
    this.setState({
      data:programInfo,
    });
  }
  
  setLoading(currentState){
    this.setState({
      loading:currentState,
    });
  }

  // Using spread operator(three dots) you are able to iterate and remove duplicate elements from the array
  // This method will get all the unique university names 
  setListOfUniName(uniName){
    this.setState({
      listOfUniName:[...new Set(uniName.map((value) => value.university_name))]
    })
  }
  
  // Using spread operator(three dots) you are able to iterate and remove duplicate elements from the array
  // This method will get all the unique program names 
  setListOfProgram(programName){
    this.setState({
      listOfProgram:[...new Set(programName.map((value) => value.title))]
    })
  }

  // Using spread operator(three dots) you are able to iterate and remove duplicate elements from the array
  // This method will get all the unique cities  
  setListOfCity(cityName){
    this.setState({
      listOfCity:[...new Set(cityName.map((value) => value.city))]
    })
  }
  // Using spread operator(three dots) you are able to iterate and remove duplicate elements from the array
  // This method will get all unique province 
  setListOfProvince(provinceName){
    this.setState({
      listOfProvince:[...new Set(provinceName.map((value) => value.province))]
    })
  }

  handleCity(cityName){
    this.setState({
      setCity: cityName,
      setUniversityProgram: "",
      setUniversityName: "",
      setProvince: "",
      setYear: "",
      checkedYear:[false,false]
    });
  }

  handleProvince(provinceName){
    this.setState({
      setProvince: provinceName,
      setUniversityProgram: "",
      setUniversityName: "",
      setCity: "",
      setYear: "",
      checkedYear:[false,false]
    });
  }

  handleUniversityName(e){
    this.setState({
      setUniversityName: e.target.value,
      setUniversityProgram: "",
      setCity: "",
      setProvince: "",
      setYear: "",
      checkedYear:[false,false]
    });
  }

  handleProgramName(programName){
    this.setState({
        setUniversityName: "",   
        setUniversityProgram: programName,
        setCity: "",
        setProvince: "",
        setYear: "",
        checkedYear:[false,false]
        }); 
  };
  
  handleDuration(programYear){
    this.setState({
        setUniversityName: "",   
        setUniversityProgram: "",
        setCity: "",
        setProvince: "",
        checkedYear:[programYear.target.id === "4" ? !this.state.checkedYear[0] : this.state.checkedYear[0],programYear.target.id === "2" ? !this.state.checkedYear[1] : this.state.checkedYear[1] ], 
        //setYear: [this.state.checkedYear[0]  && this.state.checkedYear[1]  ? ('4','2') : programYear.target.id]
        setYear:[programYear.target.id]
      }); 
  };

  setYear(){
    
    if(this.state.checkedYear[0]  && this.state.checkedYear[1] ){
      return ['4','2']
    }

    if(this.state.checkedYear[0] === true && this.state.checkedYear[1] === false){
      return ['4']
    }

    if(this.state.checkedYear[0] === false && this.state.checkedYear[1] === true){
      return ['2']
    }
  }

  getUserGradeReq(){
    this.setLoading(false)
    function_service.userGradeRequirement().then((response) =>{
      this.setData(response.map((data) => data))
      setTimeout(() => {
        this.setLoading(true)
      },1000)
    })
  }
  


  getProgramInformation() {
      if(this.state.setUniversityName === "" && 
         this.state.setUniversityProgram.length === 0 && 
         this.state.setCity.length === 0 && 
         this.state.setProvince.length === 0 &&
         this.state.setYear.length === 0){
        function_service.getAllUniversity().then((response) =>{
          this.setData(response.map((data) => data))
          this.setListOfUniName(response.map((data) => data))
          this.setListOfProgram(response.map((data) => data))
          this.setListOfCity(response.map((data) => data))
          this.setListOfProvince(response.map((data) => data))
        })
      }else{
        
        if(this.state.setUniversityName !== ""){
           this.setLoading(false)
          function_service.listOfUniName(this.state.setUniversityName).then((response) =>{
            this.setData(response.map((data) => data))
            setTimeout(() => {
              this.setLoading(true)
            },1000)
          })
            
        }
          
  
        if(this.state.setUniversityProgram.length > 0){
          this.setLoading(false)
          function_service.listOfProgramName(this.state.setUniversityProgram).then((response) =>{
            this.setData(response.map((data) => data))
            setTimeout(() => {
              this.setLoading(true)
            },1000) 
          })
        }

        if(this.state.setCity.length > 0){
          this.setLoading(false)
           function_service.listOfCities(this.state.setCity).then((response) =>{
             this.setData(response.map((data) => data))
             setTimeout(() => {
              this.setLoading(true)
            },1000) 
           })
         }

         if(this.state.setProvince.length > 0){ 
          this.setLoading(false)
           function_service.listOfProvinces(this.state.setProvince).then((response) =>{
             this.setData(response.map((data) => data))
             setTimeout(() => {
              this.setLoading(true)
            },1000)
           })
         }

         if(this.state.setYear.length > 0){
          this.setLoading(false)
           function_service.listOfDurations(this.setYear()).then((response) =>{
             this.setData(response.map((data) => data))
             setTimeout(() => {
              this.setLoading(true)
            },1000)
           })
         }
      }
           
  }

  

  render() {
   
  
    return(
      <FadeInUpDiv>
          <div className="container">
           <div className="div1">

            <div className="topRow">
              <div className="singleSelect">
                  <Box sx={{ minWidth: 120 }}>
                          <FormControl  fullWidth>
                            <InputLabel id="demo-simple-select-label">University Name</InputLabel>
                            <Select 
                              className="uniSelect"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={this.state.setUniversityName}
                              onChange={this.handleUniversityName}
                            > 
                              {this.state.listOfUniName.map((uniName) =>{
                                return(<MenuItem value={uniName}>{uniName}</MenuItem>)
                              })}

                            </Select>
                          </FormControl>
                    </Box>
                </div>

            </div>

            <div className="middleRow">
              <div className="programMultiSelect">
                <Multiselect 
                    className="testClass"
                    placeholder="Pick a program"
                    options={this.state.listOfProgram}
                    selectedValues={this.state.setUniversityProgram}
                    isObject={false}
                    onRemove={this.handleProgramName}
                    onSelect={this.handleProgramName}
                    showCheckbox
                />
              </div>

              <div className="cityMultiSelect">
                <Multiselect
                    placeholder="Pick a city"
                    options={this.state.listOfCity}
                    selectedValues={this.state.setCity}
                    isObject={false}
                    onRemove={this.handleCity}
                    onSelect={this.handleCity}
                    showCheckbox       
                />
              </div>

              <div className="provinceMultiSelect">
                <Multiselect
                    placeholder="Pick a province"
                    options={this.state.listOfProvince}
                    selectedValues={this.state.setProvince}
                    isObject={false}
                    onRemove={this.handleProvince}
                    onSelect={this.handleProvince}
                    showCheckbox       
                />
              </div>
            </div>

            <div className="bottomRow">
              <div className="durationCheckBox">
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  <FormControlLabel
                    label="4 year program"
                    control={<Checkbox  id="4" checked={this.state.checkedYear[0]} onChange={this.handleDuration} />}
                    
                  />
                  <FormControlLabel
                    label="2 year program"
                    control={<Checkbox  id="2" checked={this.state.checkedYear[1]} onChange={this.handleDuration} />}
                  />
                </Box>         
              </div>
              
              <div className="minGrade">

                <button className="programBtn" type="submit" onClick={this.getUserGradeReq}>Click to see eligible programs</button>                         
                
                <button className="programBtn" type="submit" onClick={this.getProgramInformation}>Confirm Changes</button> 

              </div>
             </div>
            </div>
              
              
              

            <div className="div2">
                  {this.state.loading ?  (this.state.data.map((university) => {
                    
                    return (
                      <div className="cardChild">
                      
                        <Card sx={{ maxWidth: 345 }} className="uni" key={university.id}>
                          <CardMedia 
                            className='test'
                            component="img"
                            height="100"
                            image= {university.logo}
                            alt={university.title}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {university.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" height={100} >
                              {university.overview}
                            </Typography>
                            <Typography class="locationText" gutterBottom variant={true} component="p" >
                              {"Location: " + university.city + ", " + university.province + ", " + university.country }
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <Link size="small" href={university.webpage} target="_blank">Learn more</Link>

                          </CardActions>
                      </Card>
                      </div>
                      
                    )
                })) : (  <CircularProgress /> )}           
          </div>
      </div>
      </FadeInUpDiv>
      
    )
  }
}

export default Programs;
