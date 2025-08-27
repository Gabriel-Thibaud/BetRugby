import { Box, styled} from '@mui/material';
import { GameBet } from './GameBet';
import { Section } from '../../widgets/Section';
import { useEffect, useState } from 'react';
import { gameDataSource } from '../../datasources/index';
import { lightGray } from '../../utils/colors';
import { getGameIDsByDay } from '../../utils/utilsBet';

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
        return getGameIDsByDay(upcomingGameIDs);
    }

    return(
        <MyBetsSection>
            <Box sx={{width: "100%"}}>
                <Title> My Bets </Title>
                <Box sx={{ color: lightGray, fontSize: "14px"}}> 2025 Women's World Cup matches </Box>
            </Box>
             { !props.activeLeagueId ?
                <Box sx={{margin: "auto"}}> Join a league to unlock the leaderboard ! </Box>
            :
                <Content>
                    {[...gamesByDays.entries()].map(([date, games]) => (
                        <DayContainer key={date}>
                            <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> {date} </Box>
                            <BetList>
                                { games.map((id: string) => 
                                    <GameBet key={id} gameId={id} activeLeagueId={props.activeLeagueId}/>         
                                )}
                            </BetList>
                        </DayContainer>
                    ))}
                </Content>
            }
        </MyBetsSection>
    );
}