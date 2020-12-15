import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, objective, type, manager) {
  return { name, objective, type, manager};
}

const rows = [
  createData('Phase 3 Cancer', 'test', 'Retrospective', 'Daniel Huston'),
  createData('COVID-19 Study', 'test', 'Observational', 'Daniel Huston'),
  createData('Phase 2 Trial', 'test', 'Experimental', 'Andrew Huston'),
  createData('Safety and efficacy', 'test', 'Cohort', 'Catherine Huston'),
  createData('Lung Cancer', 'test', 'Cross sectional', 'Joan Huston'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Study Title</TableCell>
            <TableCell align="right">Objective</TableCell>
            <TableCell align="right">Type&nbsp;(g)</TableCell>
            <TableCell align="right">Manager&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.objective}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}