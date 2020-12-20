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

function createData(name, analyst, type) {
  return { name, analyst, type };
}

const rows = [
  createData('1000 Genomes', 'Daniel Huston', 'Genomics'),
  createData('TCGA', 'John Huston', 'Genomics'),
  createData('Argos', 'Andrew Huston', 'Integrative'),
  createData('Anvil', 'Catherine Huston', 'Cytokine'),
  createData('SRA', 'Joan Huston', 'NGS'),
];

export default function BasicTable() {
  const classes = useStyles();
alert ('insidebasictable')
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Analysis Name</TableCell>
            <TableCell align="right">Analyst</TableCell>
            <TableCell align="right">Type&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.analyst}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}