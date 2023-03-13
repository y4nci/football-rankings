import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import { TEAM_STATS, TEAM_STATS_INDEX_MAP } from '../../utils/constants';

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

const sortTeams = (teams: Team[]) => {
    if (!teams || teams.length === 0) return [];

    let sortedTeams = [...teams];

    return sortedTeams.sort((a, b) => {
        const aPts = a.stats[TEAM_STATS_INDEX_MAP[TEAM_STATS_INDEX_MAP.length - 1]].value;
        const bPts = b.stats[TEAM_STATS_INDEX_MAP[TEAM_STATS_INDEX_MAP.length - 1]].value;
        if (aPts > bPts) return -1;
        if (aPts < bPts) return 1;

        const aGD = a.stats[TEAM_STATS_INDEX_MAP[TEAM_STATS_INDEX_MAP.length - 2]].value;
        const bGD = b.stats[TEAM_STATS_INDEX_MAP[TEAM_STATS_INDEX_MAP.length - 2]].value;
        if (aGD > bGD) return -1;
        if (aGD < bGD) return 1;

        return 0;
    });
};

export const StandingsTable = (props: { rows: Team[] }) => {
    const { rows } = props;

    const sortedRows = sortTeams(rows);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, maxHeight: 800 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell align="left"/>
                        <StyledTableCell align="left">Team</StyledTableCell>

                        {TEAM_STATS.map((entry, index) => (
                            <StyledTableCell align="right" key={index}>{entry}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row, index) => {
                        const colour = !(row.note) ? '#CCCCCC' : row.note.color;

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
                                <StyledTableCellTeam align="left" >
                                    {row.team.logos
                                        ? <img src={row.team.logos[0].href} alt={row.team.name} width="40" height="40"/>
                                        : <></>
                                    }
                                </StyledTableCellTeam>
                                <StyledTableCellTeam align="left" >{row.team.name}</StyledTableCellTeam>

                                {TEAM_STATS_INDEX_MAP.slice(0, -1).map((entry, idx) => (
                                    <StyledTableCellTeam align="right" key={idx}>{row.stats[entry].value}</StyledTableCellTeam>
                                ))}

                                <StyledTableCellTeam align="right" style={{ fontFamily: 'Saira-Bold' }}>
                                    {row.stats[TEAM_STATS_INDEX_MAP[TEAM_STATS_INDEX_MAP.length - 1]].value}
                                </StyledTableCellTeam>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
