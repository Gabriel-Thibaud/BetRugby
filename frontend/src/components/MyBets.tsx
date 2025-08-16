import { Box, styled} from '@mui/material';
import { GameBet } from './GameBet';
import { Section } from '../widgets/Section';
import { useEffect, useState } from 'react';
import { gameDataSource } from '../datasources/index';
import React from 'react';

const MyBetsSection = styled(Section)({
    height: "fit-content",
    maxWidth: "max(370px, 75vw)",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px"
});

const Title = styled(Box)({
    width: "100%",
    fontWeight: "bold ", 
    fontSize: "24px",
    textAlign: "left"
});

const Content = styled(Box)({
    width: "100%",
    maxHeight: "40vh",
    display : "flex",
    flexDirection: "column",
    alignItems:"center",
    overflowY: "auto",
    
    '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }
});

const DayContent = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around",
    flexWrap: "wrap",
    padding: "15px",
    gap: "10px"
});

interface MyBetsProps{
    activeLeagueId: string
}

export function MyBets(props: MyBetsProps){

    const [gamesByDays, setGamesByDays] = useState<Map<string, string[]>>(new Map());

    useEffect(() => {
        getUpcomingGameIDs().then((gamesByDays: Map<string, string[]>) => setGamesByDays(gamesByDays));
    }, []);

    async function getUpcomingGameIDs(): Promise<Map<string, string[]>>{
        const upcomingGameIDs: { id: string, date: string }[] =  await gameDataSource.getUpcomingGameIDs();
        const gamesByDays: Map<string, string[]> = new Map<string, string[]>();
        for(const game of upcomingGameIDs){
            const dateObj: Date = new Date(game.date);
            const gameDay: string = dateObj.toISOString().split("T")[0]; // return the date without the time
            if (!gamesByDays.has(gameDay))
                gamesByDays.set(gameDay, []);
            gamesByDays.get(gameDay)!.push(game.id); // non null assertion ONLY because the check is made beforre
        }
        return gamesByDays;
    }

    let dayCounter = 1;
    return(
        <MyBetsSection>
            <Title> My Bets </Title>
            <Content>
                {/* TODO: check with Cams, how to define Day 1 , 2, 3 -> enum ? day1 is the August 22nd ? */}
                {[...gamesByDays.entries()].map(([date, games]) => (
                    <React.Fragment key={date}>
                        <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day {dayCounter ++} </Box>
                        <DayContent>
                            { games.map((id: string) => 
                                <GameBet key={id} gameId={id} activeLeagueId={props.activeLeagueId}/>         
                            )}
                        </DayContent>
                    </React.Fragment>
                ))}
            </Content>
        </MyBetsSection>
    );
}