import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PALETTE } from '../../utils/constants';
import { getCurrentSeason } from '../../utils/datetime';
import { random0to5 } from '../../utils/math';

const divideIntoRows = (leagues: League[]) => {
    let rows: League[][] = [];
    let row: League[] = [];

    for (let i = 0; i < leagues.length; i++) {
        row.push(leagues[i]);
        if (i % 3 === 2) {
            rows.push(row);
            row = [];
        }
    }
    if (row.length > 0) rows.push(row);
    return rows;
};

const FormRow = (props: { rowOfLeagues: League[] }) => {
    const { rowOfLeagues } = props;

    return (
        <React.Fragment>
            {rowOfLeagues.map((league: League, index) => {
                const randomNumber = random0to5();

                const Item = styled(Paper)(({ theme }) => ({
                    backgroundColor: PALETTE[randomNumber],
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    disableElevation: true,
                }));

                return (
                    <Grid item xs={4} key={index}>
                        <Link to={'/' + league.id[0] + league.id[1] + league.id[2] + '/' + getCurrentSeason()}>
                            <Item className="league-item" >
                                <img className="league-logo" src={league.logos.light} alt={league.name} />
                                <div style={{ fontSize: 'larger' }}>{league.name}</div>
                            </Item>
                        </Link>
                    </Grid>);
            })}
        </React.Fragment>
    );
};

export const LeagueGrid = (props: { leagues: League[] }) => {
    const { leagues } = props;
    const rows = divideIntoRows(leagues);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className="grid" container spacing={1}>
                {rows.map((row: League[], index) => (
                    <Grid container item spacing={{ xs: 2, md: 3 }} key={index}>
                        <FormRow rowOfLeagues={row}/>
                    </Grid>))}
            </Grid>
        </Box>
    );
};
