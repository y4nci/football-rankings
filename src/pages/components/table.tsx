import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: 'Saira',
    //backgroundColor: useColour(tableCellClasses.body.);
    },
}));

const CustomizedTables = (rows: Team[]) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, maxHeight: 800 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell align="left">Team</StyledTableCell>
                        <StyledTableCell align="right">GP</StyledTableCell>
                        <StyledTableCell align="right">W</StyledTableCell>
                        <StyledTableCell align="right">D</StyledTableCell>
                        <StyledTableCell align="right">L</StyledTableCell>
                        <StyledTableCell align="right">GF</StyledTableCell>
                        <StyledTableCell align="right">GA</StyledTableCell>
                        <StyledTableCell align="right">GD</StyledTableCell>
                        <StyledTableCell align="right">P</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        let colour = '';
                        if (row.note === undefined) colour = '#CCCCCC';
                        else colour = row.note.color;
                        const StyledTableCellTeam = styled(TableCell)(({ theme }) => ({
                            [`&.${tableCellClasses.head}`]: {
                                backgroundColor: theme.palette.common.black,
                                color: theme.palette.common.white,
                            },
                            [`&.${tableCellClasses.body}`]: {
                                fontSize: 14,
                                fontFamily: 'Saira',
                                backgroundColor: colour,
                            },
                        }));
                        return (

                            <StyledTableRow key={index}>
                                <StyledTableCellTeam component="th" scope="row" >
                                    {index + 1}
                                </StyledTableCellTeam>
                                <StyledTableCellTeam align="left" >{row.team.name}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[3].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[0].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[2].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[1].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[4].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[5].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[9].value}</StyledTableCellTeam>
                                <StyledTableCellTeam align="right">{row.stats[6].value}</StyledTableCellTeam>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { CustomizedTables };
