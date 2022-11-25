import React, { Component } from "react";
import function_service from "../services/function_service";
import "../css/Programs.page.css"




class Programs extends Component {
  
  constructor(props) {
    //const [searchTerm,setSearchTerm] = useState('');
    
    super(props);
    
    this.getProgramInformation = this.getProgramInformation.bind(this); 
    this.setData = this.setData.bind(this); 
    this.onChangeSearchUni = this.onChangeSearchUni.bind(this);
    
    // When the website is first launch all university and there programs should be displayed 
    // The university search filter will handle one university at a time , there shold be  a list of all the university name and you are only able to select one 
    // The program search filter should be multiple select checkbox where the user can select different programs(Such as CS or Math)
    // The user grade filter will be a clickable button which will show all the minimum requirements(Handled back end )
    //
    // controls state of Programs.
    this.state = {
      data: [],
      search: ""
    };

  }
  
  
  setData(programInfo){
    this.setState({
      data:programInfo
    });
  }
  
  onChangeSearchUni(e){
    this.setState({
      search: e.target.value
    });
  }

  getProgramInformation(e) {
      e.preventDefault();

      if(this.state.search !== ""){
        function_service.programsList(this.state.search).then((response) =>{
          this.setData(response.map((data) => data)) 
          console.log(this.state.searchParam)
        })
      }
  }

  

  render() {
   
  
    return(
      <div className = "container">
        <form onSubmit={this.getProgramInformation}>
           <div className="div1">
              <input 
              type="Search University" 
              placeholder="Search by University name" 
              name="Search bar"
              value={this.state.search}
              onChange={this.onChangeSearchUni}
              required
              />
            </div>

            <div className="div2">
                {this.state.data.map((university) => {
                  return (
                    <h1 key={university.id}>{university.university_name} {university.title}</h1>
                  )
              })}
          </div>
        </form>  
      </div>
    )
  }
}

export default Programs;
