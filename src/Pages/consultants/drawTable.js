import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse } from "@mui/material";
import Box from '@mui/material/Box';
import '../../css/Consultant.css';
import function_service from '../../services/function_service'
import {Document, Page} from 'react-pdf'
import TextField from '@mui/material/TextField';
function CreateRows(user) {
  const [open, setOpen] = React.useState(false);
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setOpen(!open) }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{user.f_name}</TableCell>
        <TableCell>{user.l_name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.dob}</TableCell>
        <TableCell>{user.country}</TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0 }} colSpan={6}>
        <Collapse in={open} unmountOnExit>
          <Box className="files">
            {GetFiles(user)}
          </Box>
        </Collapse>
      </TableCell>
      </TableRow>
    </TableBody>
  );
}

function GetFiles(user) {
    return user.files.map((file) => {
      var isChecked = checkReviewed(file)
      var comments = file.comments
      return (
      <TableCell className="file">
        <h1>{file.name}</h1>
        {/* <div>
      <Document file={file.name} >
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {1} of {5}
      </p>
    </div> */}
        <br></br>
        <TextField
          id="outlined-multiline-flexible "
          className="comments"
          label="Comments"
          multiline
          defaultValue= {comments}
          maxRows={5}
          onChange={(e) => {comments = e.target.value; console.log(comments)}}
        />
        <br></br>
        <div className="input">
        <label>
          <input
            defaultChecked = {isChecked}
            type = "checkbox"  
            onChange={(event) => {isChecked = !isChecked; event.target.checked = isChecked;
            console.log(event.target.checked)}}
          />
          Reviewed
        </label>
        </div>
        <br></br>
        <div className="buttons">
        <button id = {file.id}>View</button>
        <button
          id = {file.id} 
          className = "save"
          onClick={e =>handleReviewed(isChecked,e, comments)}
        >
          Save
        </button>
        </div>
      </TableCell>
      )
    });
}

// function showPdf(file) {
//   return (
    
//   );
// }

function checkReviewed(file) {
  if (file.reviewed === 0 || file.reviewed === null) {
    return false
  } else 
    return true
  
}

function handleReviewed(isChecked, e, comments) {
  console.log(isChecked)
  var reviewBit = 0;
  if (isChecked) {
    reviewBit = 1
  }
  
  function_service.setReview(e.target.id, reviewBit, comments).then((resp) =>{
      console.log('TEST')
    })
}

export default function GenerateTable(props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell> First Name </TableCell>
          <TableCell> Last Name </TableCell>
          <TableCell> Email </TableCell>
          <TableCell> DOB </TableCell>
          <TableCell> Country </TableCell>
        </TableRow>
      </TableHead>
      {props.users.map((user) => {
        return CreateRows(user);        
      })}
    </Table>
  );
}
