import { Box, MenuItem, Select, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Section } from "../../widgets/Section";
import { gameDataSource, userDataSource } from "../../datasources";
import { League } from "../../datasources/LeagueDataSource";
import { white } from "../../utils/colors";
import { GameBet } from "./GameBet";
import { GamesByDay, getGameIDsByDay } from "../../utils/utilsBet";

const PageContainer = styled(Box)({
    display: "flex", 
    flexDirection: "column",

});

const BetsContainer =  styled(Section)({
    width: "100%",
    minWidth: "95vw",
    display: "flex", 
    flexDirection: "column",
    margin: "5px"
});

const Title = styled(Box)({
    fontSize: "20px", 
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


export function BetsAndResults(){

    const womenWorlCup: string = "Women's Rugby World Cup"; // name from BetsAPI (so it might change)

    // TODO: check if from my bets i can send activeLeagueId

    const [leagueId, setLeagueId] = useState<string>("");
    const [leagueList, setLeagueList] = useState <League[]>([]);

    // gameIDs per day
    const [womenWorldCupGames, setWomenWorldCupGames] = useState<GamesByDay>(new Map());

    //TODO: have one state array per competition (like in myBets, day and id)

    useEffect(() => {
        userDataSource.getUserLeagueList().then((leagues:League[]|null) => {
            if  (!leagues)
                return;
            setLeagueList(leagues);
            console.log(leagueId, leagues.length, leagues[0])
            if (!leagueId && !!leagues.length)
                setLeagueId(leagues[0].id);
        })
    }, []);

    useEffect(() => {
        getWomenWorlCupGames().then((gameIDsByDay: GamesByDay) => {
            if (!gameIDsByDay)
                return;
            setWomenWorldCupGames(gameIDsByDay);

        })
        // betDataSource.getBet()

    }, [leagueId]);

    async function getWomenWorlCupGames(): Promise<GamesByDay> {
        const games: { id: string, date: string }[] =  await gameDataSource.getGamesByCompetitionName(womenWorlCup); 
        return getGameIDsByDay(games);
    }
 
    return (
        <PageContainer>
            <Box>
                <Select sx={{height:"30px", width: "fit-content", backgroundColor: white}}
                        value={leagueId}
                        onChange={(e) => setLeagueId(e.target.value)}
                >
                    {leagueList.map((league: League) =>
                        <MenuItem key={league.id} value={league.id}> {league.name} </MenuItem>
                    )}
                </Select>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column"}}>
               <BetsContainer>
                    <Title> My Bets </Title>
                    <Box>
                        {[...womenWorldCupGames.entries()].map(([date, games]) => (
                             <DayContainer key={date}>
                                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> {date} </Box>
                                <BetList>
                                    { games.map((game:{ id: string, isUpdatable: boolean }) => 
                                        <GameBet 
                                            key={game.id} 
                                            gameId={game.id} 
                                            activeLeagueId={leagueId} 
                                            disableBet={!game.isUpdatable}
                                        />         
                                    )}
                                </BetList>
                            </DayContainer>
                        ))}
                    </Box>
                </BetsContainer>
            </Box>
            

        </PageContainer>
    );
}