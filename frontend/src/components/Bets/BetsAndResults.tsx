import { Box, MenuItem, Select, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Section } from "../../widgets/Section";
import { gameDataSource, userDataSource } from "../../datasources";
import { League } from "../../datasources/LeagueDataSource";
import { GameBet } from "./GameBet";
import { GamesByDay, getGameIDsByDay } from "../../utils/utilsBet";
import { GameResult } from "./GameResult";
import { DailyScore } from "./DailyScore";
import { darkBlue, white } from "../../utils/colors";

const PageContainer = styled(Box)({
    display: "flex", 
    flexDirection: "column",
    width: "100%"
});

const SelectLeague = styled(Section)({
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
});

const MainContainer = styled(Section)({
    display: "flex", 
    flexDirection: "column",
    margin: "10px"
});

const BetsContainer = styled(Box)({
    "@media (max-width: 1010px)":{
        margin: "20px"
    }
});

const Title = styled(Box)({
    fontSize: "24px", 
    fontWeight: "bold"
});

const DayContainer = styled(Box)({
    display : "flex",
    flexDirection: "column",
    alignItems:"center",
    marginBottom: "20px",
});

const BetList = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around",
    flexWrap: "wrap",
    padding: "15px",
    gap: "10px"
});

const GameContainer = styled(Box)({
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    gap: "5px"
});

export function BetsAndResults(){

    const womenWorlCup: string = "Women's Rugby World Cup"; // name from BetsAPI (so it might change)

    const [leagueId, setLeagueId] = useState<string>("");
    const [leagueList, setLeagueList] = useState <League[]>([]);

    // gameIDs per day
    const [womenWorldCupGames, setWomenWorldCupGames] = useState<GamesByDay>(new Map());

    //TODO: have one state array per competition

    useEffect(() => {
        userDataSource.getUserLeagueList().then((leagues:League[]|null) => {
            if (!leagues)
                return;
            setLeagueList(leagues);
            if (!leagueId && !!leagues.length)
                setLeagueId(leagues[0].id);
        })
    }, []);

    useEffect(() => {
        getWomenWorlCupGames().then((gameIDsByDay: GamesByDay) => {
            if (!gameIDsByDay)
                return;
            setWomenWorldCupGames(gameIDsByDay);
        });

    }, [leagueId]);

    async function getWomenWorlCupGames(): Promise<GamesByDay> {
        const games: { id: string, date: string }[] =  await gameDataSource.getGamesByCompetitionName(womenWorlCup); 
        return getGameIDsByDay(games);
    }
 
    return (
        <PageContainer>
            <SelectLeague>
                <Box sx={{color: darkBlue, fontSize: "18px", fontWeight: "bold"}}>League:</Box>
                <Select sx={{height:"30px", width: "fit-content", backgroundColor: white}}
                        value={leagueId}
                        onChange={(e) => setLeagueId(e.target.value)}
                >
                    {leagueList.map((league: League) =>
                        <MenuItem key={league.id} value={league.id}> {league.name} </MenuItem>
                    )}
                </Select>
            </SelectLeague>
            <Box sx={{ display: "flex", flexDirection: "column"}}>
               <MainContainer>
                    <Title> Bets & Results </Title>
                    <BetsContainer>
                        {[...womenWorldCupGames.entries()].map(([date, games]) => (
                             <DayContainer key={date}>
                                <Box sx={{fontWeight: "bold ", fontSize: "24px"}}> {date} </Box>
                                <Box sx={{ display: "flex", alignItems: "center", width:"100%"}}>
                                    <BetList>
                                        { games.map((game:{ id: string, isUpdatable: boolean }) => 
                                            <GameContainer sx={{}} key={game.id}>
                                                <GameResult gameId={game.id}/>
                                                <GameBet gameId={game.id} activeLeagueId={leagueId} disableBet={!game.isUpdatable}/>
                                            </GameContainer >       
                                        )}
                                    </BetList>
                                    <DailyScore 
                                        leagueId={leagueId} 
                                        gameIDs={games.map((game: { id: string, isUpdatable: boolean }) => game.id)}
                                    />
                                </Box>
                            </DayContainer>
                        ))}
                    </BetsContainer>
                </MainContainer>
            </Box>
        </PageContainer>
    );
}