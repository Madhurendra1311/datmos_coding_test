import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ApiCall() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts ] = useState([])

  useEffect(()=>{
    axios.get("https://reqres.in/api/users")
        .then(res=>{
            console.log(res)
            setPosts(res.data.data)
        })
        .catch(err =>{
            console.log(err)
        })
}, [])

  return (
      <>
        <div style={{marginLeft:"400px", padding:"20px"}}>
        <h1>Search by First Name</h1>
            <input type="text" placeholder="search..." onChange={e=> {setSearchTerm(e.target.value)}}/><br/>
        </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">First Name</StyledTableCell>
                    <StyledTableCell align="right">Last Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    posts.filter((val)=>{
                        if(searchTerm === ""){
                          return val
                        }else if(val.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
                          return val
                        }
                      }).map((row) => (
                            <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                            <StyledTableCell align="right">{row.first_name}</StyledTableCell>
                            <StyledTableCell align="right">{row.last_name}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
            </TableContainer>
    </>
  );
}
