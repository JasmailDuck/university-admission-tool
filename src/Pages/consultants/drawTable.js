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
import '../../css/Consultant.css'

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react


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
            {getFiles(user)}
          </Box>
        </Collapse>
      </TableCell>
      </TableRow>
    </TableBody>
  );
}

 function getFiles(user) {
       return user.files.map((file) => {
        return (<TableCell className="file">{file.name}</TableCell>)
      });
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
