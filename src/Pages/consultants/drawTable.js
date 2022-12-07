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
import Checkbox from '@mui/material/Checkbox';
import function_service from '../../services/function_service'
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
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} unmountOnExit>
          <Box>
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
      return (
      <TableCell className="file">
        {file.name}
        <input
        defaultChecked = {isChecked}
        type = "checkbox"  
        onChange={(event) => {isChecked = !isChecked; event.target.checked = isChecked;
        console.log(event.target.checked)}}/>
        Reviewed
        <button
          id = {file.id} 
          onClick={e =>handleReviewed(isChecked,e)}
        >
          Save
        </button>
      </TableCell>
      )
    });
}

function checkReviewed(file) {
  if (file.reviewed === 0 || file.reviewed === null) {
    return false
  } else 
    return true
  
}

function handleReviewed(isChecked, e) {
  console.log(isChecked)
  var reviewBit = 0;
  if (isChecked) {
    reviewBit = 1
  }
  
  function_service.setReview(e.target.id, reviewBit).then((resp) =>{
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
