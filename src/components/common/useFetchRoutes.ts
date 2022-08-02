import {useEffect, useState} from "react";
import {LeagueDataQuery} from "../../types/leagueDataQuery";

const useFetchRoutes = () => {
  const url = "https://api-football-standings.azharimm.site/leagues/";
  const [data, setData]: [LeagueDataQuery|undefined, (obj:LeagueDataQuery)=>void] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal }).then(
        res => {
          if (!res.ok)
            throw Error("error");

          return res.json();
        }
    ).then(
        data => {
          setIsLoading(false);
          setError(null);
          setData(data);
        }
    ).catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted');
        return;
      } else {
        // auto catches network / connection error
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
    });

    return () => abortCont.abort();
  }, [url]);

  return {data, error, isLoading};
}

export default useFetchRoutes ;
