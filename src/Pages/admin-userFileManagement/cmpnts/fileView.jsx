import { Component } from 'react'
import FILE_SERVICE from '../../../services/file_service';
import DELETEFILE from './deleteFile';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'




class fileView extends Component {


  constructor(props) {

    super(props);
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)



 

    
    this.state = {
      id: sessionStorage.getItem("fileID"),
      file: "",
      pageNum: 1,
      test: false,
      fileObject: ""
    };
  }

  

  // These methods are called upon when setting up user profile, calling the API
  setFile(file) {
    this.setState({
      file: file,
    });
  }


  setTest(test) {
    this.setState({
      test: test,
    });
  }


  setFileObject(file) {
    this.setState({
      fileObject: file,
    });
  }

  setPageNum(num) {
    this.setState({
      pageNum: num,
    });
  }






  getFileInformation() {
    
    FILE_SERVICE.getFileByID(this.state.id).then((file) => {
      this.setFile(file.file)
      this.setFileObject(file)

    })
  }




  nextPage() {
    this.setPageNum(this.state.pageNum + 1)
  }

  prevPage() {
    this.setPageNum(this.state.pageNum - 1)
  }

 


  componentDidMount() {
    this.getFileInformation();

  }


  render() {

    
    return (
      <div className='flex h-full'>

        <div id='pdf-view' className=' flex-1 flex justify-center  bg-neutral-100 p-2'>
          <Document file={this.state.file} className=" "  >
            <Page pageNumber={this.state.pageNum} renderTextLayer={false} />
          </Document>
        </div>

        <div className=' flex flex-col  flex-1'>
          <div id='fileController' className='mb-8 p-2 text-2xl'>
            File Details
          </div>

          <div id='pageController' className='p-4 flex flex-col justify-center items-center border-y'>
            <div className='mb-5'>
              Page View Controller
            </div>
            <div className='flex'>
              <button onClick={this.prevPage} className='p-2 bg-neutral-200 rounded-2xl mx-5'>{"< Previous Page "}</button>
              <span className='p-2  mx-5'>{this.state.pageNum}</span>
              <button onClick={this.nextPage} className='p-2 bg-neutral-200 rounded-2xl mx-5'>{"Next Page >"}</button>
            </div>
          </div>

          <div className='p-4'>
            File Uploaded By: {this.state.fileObject.email}
          </div>

          <div className='p-4'>
            File Has Been Reviewed: {this.state.fileObject.reviewed}
          </div>

          <div className='p-4'>
            Comments: {this.state.fileObject.comments}
          </div>

          

        <DELETEFILE />

        </div>



      </div>

    )



  }

}

export default fileView