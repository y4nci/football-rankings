import * as React from 'react';
import { Link } from 'react-router-dom';

import { getCurrentSeason } from '../../utils/datetime';

const sortLeagues = (leagues: League[]) => {
    if (!leagues || leagues.length === 0) return [];

    let sortedLeagues = [...leagues];

    return sortedLeagues.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

const divideIntoLetterBuckets = (leagues: League[]) => {
    const buckets: { [key: string]: League[] } = {};

    leagues.forEach((league) => {
        const firstLetter = league.name[0].toUpperCase();

        if (!buckets[firstLetter]) {
            buckets[firstLetter] = [];
        }

        buckets[firstLetter].push(league);
    });

    // sort the buckets by the first letter, then sort the leagues within each bucket
    return Object.keys(buckets)
        .sort()
        .map(key => sortLeagues(buckets[key]));
};

/**
 * takes leagues starting with the same letter and displays them as a list
 * @param props 
 * @returns 
 */
const LeagueSublist = (props: { leagues: League[] }) => {
    const { leagues } = props;

    /* <React.Fragment>
            {rowOfLeagues.map((league: League, index) => {
                const randomNumber = random0to5();

                const Item = styled(Paper)(({ theme }) => ({
                    backgroundColor: PALETTE[randomNumber],
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    disableElevation: true,
                }));

                return (
                    <Grid item xs={3} key={index}>
                        <Link to={'/football-rankings/' + league.slug + '/' + getCurrentSeason()}>
                            <Item className="league-item" >
                                <img
                                    className="league-logo"
                                    src={league.logos[0]
                                        ? league.logos[0].href
                                        : 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png'
                                    }
                                    alt={league.name}
                                />
                                <div style={{ fontSize: 'larger' }}>{league.name}</div>
                            </Item>
                        </Link>
                    </Grid>);
            })}
        </React.Fragment> */

    return (
        <div style={{ marginBottom: '40px' }}>
            {leagues.map((league: League, index) => {
                return (
                    <Link to={'/football-rankings/' + league.slug + '/' + getCurrentSeason()} key={index}>
                        <div className="league-item">
                            <img
                                className="league-logo"
                                src={league.logos[0]
                                    ? league.logos[0].href
                                    : 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png'
                                }
                                alt={league.name}
                            />
                            <div className='league-list-name'>{league.name}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export const LeagueList = (props: { leagues: League[] }) => {
    const letterBuckets = divideIntoLetterBuckets(props.leagues);

    return (
        <div className="league-list">
            {letterBuckets.map((leagues, index) => (
                <div key={index}>
                    <h1
                        style={{
                            color: 'white',
                            backgroundColor: '#00504d',
                            textAlign: 'center',
                        }}
                    >{leagues[0].name[0].toUpperCase()}</h1>
                    <LeagueSublist leagues={leagues} />
                </div>
            ))}
        </div>
    );
};
