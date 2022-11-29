import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse } from "@mui/material";
import Typography from "@mui/material/Typography";
import user_service from "../../services/user_service";
import { dataURLToFile } from "../../helpers/fileHelper";

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react


function CreateRows(user, ) {
  const [open, setOpen] = React.useState(false);
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {setOpen(!open); }}
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
      <Collapse in={open}>
      {/* <TableRow><TableCell>
      </TableCell>{user.files}</TableRow> */}
      </Collapse>
    </TableBody>
  );
}

async function getFiles(email, user) {
  
  user.files = [];
   await user_service.getAllFiles(email).then((resp) => {
    if (resp.length > 0) {
      resp.map((index) => {
        user.files.push(dataURLToFile(index.dataURL, index.name));

      });
    }
  }).then(() => {return user})
  
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
{/* let returnedUser = getFiles(user.email, user);
        returnedUser.then((user) =>{
          if(returnedUser != undefined){ */}
      {props.users.map((user) => {
  
        return CreateRows(user);  
      
        
      })}
    </Table>
  );
}
