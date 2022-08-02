import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {LeagueData} from "../types/leagueData";
import {Link} from 'react-router-dom';

const random0to5 = (n1: number, n2: number) => {
  return Math.floor(Math.random() * 5);
}

const divideIntoRows = (leagues: LeagueData[]) => {
  let rows: LeagueData[][] = [];
  let row: LeagueData[] = [];
  for (let i = 0; i < leagues.length; i++) {
    row.push(leagues[i]);
    if (i % 3 === 2) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length > 0) rows.push(row);
  return rows;
}

const FormRow = (props: {rowOfLeagues: LeagueData[], rowNumber: number}) => {
  let rowOfLeagues = props.rowOfLeagues;
  let rowNumber = props.rowNumber;

  return (
    <React.Fragment>
      {rowOfLeagues.map((league: LeagueData, index) => {
        const palette=["#efddcd", "#ff5f65", "#0cc2bc", "#e28d00", "#c2e12e"];
        const randomNumber = random0to5(rowNumber, index);

        const Item = styled(Paper)(({theme}) => ({
          backgroundColor: palette[randomNumber],
          padding: theme.spacing(1),
          textAlign: 'center',
        }));

        return (
          <Grid item xs={4}>
            <Item className="league-item">
              <Link to={"/" +league.id[0] + league.id[1] + league.id[2] + "/2022"}>
                <img className="league-logo" src={league.logos.light} alt={league.name} />
              </Link>
            </Item>
          </Grid>)
        }
      )}
    </React.Fragment>
  );
}

const NestedGrid = (leagues: LeagueData[]) => {
  let rows = divideIntoRows(leagues);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid className="grid" container spacing={1}>
        {rows.map((row: LeagueData[], index) => (
          <Grid container item spacing={{ xs: 2, md: 3 }}>
            <FormRow rowOfLeagues={row} rowNumber={index}/>
          </Grid>)
          )}
      </Grid>
    </Box>
  );
}

export {NestedGrid}
