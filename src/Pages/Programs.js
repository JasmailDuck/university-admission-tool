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

class Programs extends Component {
  
  constructor(props) {
    //const [searchTerm,setSearchTerm] = useState('');
    
    super(props);
    
    this.handleUniversityName = this.handleUniversityName.bind(this); 
    this.handleProgramName = this.handleProgramName.bind(this); 
    this.getProgramInformation = this.getProgramInformation.bind(this); 
    this.setData = this.setData.bind(this); 
    this.setListOfUniName= this.setListOfUniName.bind(this);
    this.setListOfProgram= this.setListOfProgram.bind(this); 
   // this.onChangeSearchUni = this.onChangeSearchUni.bind(this);
    
    // When the website is first launch all university and there programs should be displayed 
    // The university search filter will handle one university at a time , there shold be  a list of all the university name and you are only able to select one 
    // The program search filter should be multiple select checkbox where the user can select different programs(Such as CS or Math)
    // The user grade filter will be a clickable button which will show all the minimum requirements(Handled back end )
    //
    // controls state of Programs.
    this.state = {
      
      listOfUniName:[],
      listOfProgram:[],
      data: [],
      setUniversityProgram: [],
      setUniversityName: ""
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
  
  // This method will get all the unique university names 
  setListOfUniName(uniName){
    this.setState({
      listOfUniName:[...new Set(uniName.map((value) => value.university_name))]
    })
  }
  // This method will get all the unique program names 
  setListOfProgram(programName){
    this.setState({
      listOfProgram:[...new Set(programName.map((value) => value.title))]
    })
  }

  handleUniversityName(e){
    this.setState({
      setUniversityName: e.target.value,
      setUniversityProgram: ""
    });
  }

  handleProgramName(programName){
   
    this.setState({
        setUniversityName: "",   
        setUniversityProgram: programName
         
        }); 

  };

  getProgramInformation() {
      // e.preventDefault();
      if(this.state.setUniversityName === "" && this.state.setUniversityProgram.length === 0){
        function_service.getAllUniversity().then((response) =>{
          this.setData(response.map((data) => data))
          this.setListOfUniName(response.map((data) => data))
          this.setListOfProgram(response.map((data) => data))
          
        })
      }else{

        if(this.state.setUniversityName !== ""){
          function_service.listOfUniName(this.state.setUniversityName).then((response) =>{
            this.setData(response.map((data) => data)) 
          })
        }
          
  
        if(this.state.setUniversityProgram.length > 0){
         console.log(this.state.setUniversityProgram); 
          function_service.listOfProgramName(this.state.setUniversityProgram).then((response) =>{
            this.setData(response.map((data) => data)) 
          })
        }
      }
           
  }

  

  render() {
   
  
    return(
      <div className = "container">
        {/* <form onSubmit={this.getProgramInformation}> */}
           <div className="div1">
              <div className="singleSelect">
                <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">University Name</InputLabel>
                          <Select
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

              <div className="programMultiSelect">
                <Multiselect
                    placeholder="Pick a program"
                    options={this.state.listOfProgram}
                    selectedValues={this.state.setUniversityProgram}
                    //onChange={this.handleProgramName}
                    // labelledBy="Select"
                    isObject={false}
                    onRemove={this.handleProgramName}
                    onSelect={this.handleProgramName}
                    // showCheckbox
                />
              </div>

              <button type="submit" onClick={this.getProgramInformation}>Confirm Changes</button> 
            </div>

            <div className="div2">
              
                {this.state.data.map((university) => {
                  //console.log(this.state.listOfUniName)
                  return (
                    <Card sx={{ maxWidth: 345}} className= "uni" key={university.id}>
                        <CardMedia 
                          className = 'test'
                          component="img"
                          height="100"
                          image= {university.logo}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {university.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" height={100} >
                            {university.overview}
                          </Typography>
                          <Typography gutterBottom variant={true} component="p" >
                            {"Location: " + university.reigon + " " + university.country }
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link size="small" href={university.webpage}>Learn more</Link>
                        </CardActions>
                    </Card>
                    //<h1 key={university.id}>{university.university_name} {university.title}</h1>
                  )
              })}
          </div>
      </div>
    )
  }
}

export default Programs;
