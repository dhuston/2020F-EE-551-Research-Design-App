import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, indication, investigator) {
  return {
    name,
    indication,
    investigator,
    description: [
      { date: '2020-01-05', description: 'Understand Cancer Resistance'},
      { date: '2020-01-02', description: 'Secondary Analysis'},
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.indication}</TableCell>
        <TableCell align="right">{row.investigator}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Analyses
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Analysis Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.description.map((descriptionRow) => (
                    <TableRow key={descriptionRow.date}>
                      <TableCell component="th" scope="row">
                        {descriptionRow.date}
                      </TableCell>
                      <TableCell>{descriptionRow.description}</TableCell>
                      <TableCell align="right">{descriptionRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    indication: PropTypes.string.isRequired,
    carbs: PropTypes.string.isRequired,
    investigator: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    protein: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Understand Cancer Resistance on patients with combination therapy', 'Lung', 'Dr. Daniel Huston'),
  createData('Understand COVID-19 Spike Protein', 'Infectious Diseases', 'Dr. John Huston'),
  createData('Double Blinded Study ', '262', 'Dr. Andrew Huston'),
  createData('See if heart rate is correlated with sleep disorders', 'Neurology', 'Dr. Catherine Huston'),
  createData('Understand the Tumor Microenvironment of Patients with Melanoma on mono', 'Melanoma', 'Dr. Joab Huston'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Goal Name</TableCell>
            <TableCell align="right">Indication</TableCell>
            <TableCell align="right">Investigator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}