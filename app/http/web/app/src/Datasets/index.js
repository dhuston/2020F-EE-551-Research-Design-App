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

function createData(name, owner, type, location) {
  return { name, owner, type, location };
}

const rows = [
    createData('1000 Genomes', 'Daniel Huston', 'Genomics', '/1000 Genomes'),
    createData('TCGA', 'John Huston', 'Genomics', '/TCGA'),
    createData('Argos', 'Andrew Huston', 'Integrative', '/Argos'),
    createData('Anvil', 'Catherine Huston', 'Cytokine', '/Anvil'),
    createData('SRA', 'Joan Huston', 'NGS', '/SRA'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dataset Name (100g serving)</TableCell>
            <TableCell align="right">Owner</TableCell>
            <TableCell align="right">Type&nbsp;(g)</TableCell>
            <TableCell align="right">Location&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}