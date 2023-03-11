import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PALETTE } from "../../utils/constants";
import { random0to5 } from "../../utils/math";

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

const FormRow = (props: { rowOfLeagues: League[], rowNumber: number }) => {
    let rowOfLeagues = props.rowOfLeagues;
    // let rowNumber = props.rowNumber;

    return (
        <React.Fragment>
            {rowOfLeagues.map((league: League) => {
                const randomNumber = random0to5();

                const Item = styled(Paper)(({ theme }) => ({
                    backgroundColor: PALETTE[randomNumber],
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    disableElevation: true,
                }));

                return (
                    <Grid item xs={4}>
                        <Item className="league-item" >
                            <Link to={'/' + league.id[0] + league.id[1] + league.id[2] + '/2022'}>
                                <img className="league-logo" src={league.logos.light} alt={league.name} />
                            </Link>
                        </Item>
                    </Grid>);
            })}
        </React.Fragment>
    );
};

const NestedGrid = (leagues: League[]) => {
    let rows = divideIntoRows(leagues);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid className="grid" container spacing={1}>
                {rows.map((row: League[], index) => (
                    <Grid container item spacing={{ xs: 2, md: 3 }}>
                        <FormRow rowOfLeagues={row} rowNumber={index}/>
                    </Grid>))}
            </Grid>
        </Box>
    );
};

export { NestedGrid };
