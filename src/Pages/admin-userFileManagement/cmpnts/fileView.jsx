import { Component } from 'react'
import FILE_SERVICE from '../../../services/file_service';

import { Document, Page,  pdfjs } from 'react-pdf/dist/esm/entry.webpack5'

//pdfjs.GlobalWorkerOptions.workerSrc = `cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

class fileView extends Component {


    constructor(props) {
  
      super(props);
  
  
  
      this.state = {
        id: sessionStorage.getItem("fileID"),
        file: "",
        pageNum: 1,
        test: false
      };
    }
  
  
  
    // These methods are called upon when setting up user profile, calling the API
    setFile(file) {
      this.setState({
        file: file,
      });
    }
    setPageNum(num) {
        this.setState({
          pageNum: num,
        });
      }

      setTest(test) {
        this.setState({
          test: test,
        });
      }
    
  

    
  
    getFileInformation() {
      FILE_SERVICE.getFileByID(this.state.id).then((file)=> {
        this.setFile(file.file)
        console.log(file.file);       
      })
    }
  
    
  
  
  
    componentDidMount() {
      this.getFileInformation();
      
  
    }
    
  
    render() {
        //let i = this.state.pageNum
        
        
        //const url = URL.createObjectURL()
        return(
            <div className='flex'>
                <Document file={this.state.file} options>
                    <Page pageNumber={this.state.pageNum} />
                </Document>
                
            </div>
            
        )
        
  
      
  }
  
} 
  
  export default fileView