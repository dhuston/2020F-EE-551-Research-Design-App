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

function createData(name, goal, indication, investigator) {
  return {name, goal, indication, investigator};
}

const rows = [
  createData('Mechanisms of resistance', 'Lung', 'Dr. Daniel Huston'),
  createData('Tumor micro environment', 'Melanoma', 'Dr. John Huston'),
  createData('Oncogenesis', 'Multiple', 'Dr. Andrew Huston'),
  createData('Virology', 'Breast', 'Dr. Catherine Huston'),
  createData('Hematopoietic', 'Prostate', 'Dr. Joan Huston'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Research Goal</TableCell>
            <TableCell align="right">Indication</TableCell>
            <TableCell align="right">Investigator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.goal}</TableCell>
              <TableCell align="right">{row.indication}</TableCell>
              <TableCell align="right">{row.investigator}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}