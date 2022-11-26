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


class Programs extends Component {
  
  constructor(props) {
    //const [searchTerm,setSearchTerm] = useState('');
    
    super(props);
    
    this.handleUniversityName = this.handleUniversityName.bind(this); 
    this.handleProgramName = this.handleProgramName.bind(this); 
    this.getProgramInformation = this.getProgramInformation.bind(this); 
    this.setData = this.setData.bind(this); 
   // this.onChangeSearchUni = this.onChangeSearchUni.bind(this);
    


    // controls state of Programs.
    this.state = {
      listOfProgram:[
        {
          value: "Accounting" 
        },
        {
          value: "Automotive Service Technology" 
        },
        {
          value: "Business Administration" 
        },
        {
          value: "Civil Engineering Technology" 
        },
        {
          value: "Chemical Engineering Technology" 
        },
        {
          value: "Computer Science" 
        },
        {
          value: "Bachelor of Computer Information Systems" 
        },
        {
          value: "Nursing" 
        },
        {
          value: "Psychology" 
        },
        {
          value: "Bachelor of Computer Information Systems" 
        },
        {
          value: "Bachelor of Computer Information Systems" 
        }

      ],
      data: [],
      setUniversityProgram: [],
      setUniversityName: ""
    };

  }

  componentDidMount() {
    this.getProgramInformation();
  }
  
  
  setData(programInfo){
    this.setState({
      data:programInfo
    });
  }
  
  // onChangeSearchUni(e){
  //   this.setState({
  //     search: e.target.value
  //   });
  // }

  handleUniversityName(e){
    console.log(e.target.value)
    this.setState({
      setUniversityName: e.target.value
    });
  }

  handleProgramName(e){
    console.log(e.map((uni) => uni.value))
    this.setState({
      setUniversityProgram: this.state.setUniversityName.concat(e.map((uni) => uni.value))
    });

  };

  getProgramInformation() {
      // e.preventDefault();
      
        function_service.listOfUniName(this.state.setUniversityName).then((response) =>{
          this.setData(response.map((data) => data)) 
        })
      

      
        // function_service.programsList(this.state.setUniversityProgram).then((response) =>{
        //   this.setData(response.map((data) => data)) 
        // })
    
       
      
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
                            <MenuItem value={"Mount Royal University"}>MRU</MenuItem>
                            <MenuItem value={"Southern Alberta Institute of Technology"}>SAIT</MenuItem>
                            <MenuItem value={"University of Alberta"}>University of Alberta</MenuItem>
                            <MenuItem value={"University of British Columbia"}>University of British Columbia</MenuItem>
                            <MenuItem value={"University of Calgary"}>University of Calgary</MenuItem>
                            <MenuItem value={"University of Toronto"}>University of Toronto</MenuItem>
                            <MenuItem value={"University of Waterloo"}>University of Waterloo</MenuItem>
                          </Select>
                        </FormControl>
                  </Box>
              </div>

              {/* <div className="multiSelect">
              <MultiSelect
                  options={this.state.options}
                  value={this.state.setUniversityProgram}
                  onChange={this.handleProgramName}
                  labelledBy="Select"
                 />
              </div> */}

              <button type="submit" onClick={this.getProgramInformation}>Confirm Changes</button> 
            </div>

            <div className="div2">
              {console.log(this.state.data)}
                {this.state.data.map((university) => {
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
