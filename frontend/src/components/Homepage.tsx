import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues/Leagues';
import { MyBets } from './Bets/MyBets';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { useState } from 'react';

const HomepageContainer = styled(Box)({
    height: "100%",
    width: "100%",
    display: "flex", 
    justifyContent: "space-around",
    alignItems:"center", 
    flexWrap: "wrap"
});

const LeftContent = styled(Box)({
    height: "100%",
    maxWidth: "max(370px, 50vw)",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-around",
    padding: "10px",
    gap: "15px"
});

const RightContent = styled(Box)({
    height: "100%",
    maxWidth: "max(370px, 50vw)",
    display: "flex", 
    flexDirection:"column",
    justifyContent: "space-around",
    padding: "10px"
});


export function Homepage() {
    
    const [activeLeagueId, setActiveLeagueId] = useState <string>("");

    return (
        <HomepageContainer>
            <LeftContent>
                <Leagues activeLeagueId={activeLeagueId} onLeagueUpdate={(leagueId: string) => setActiveLeagueId(leagueId)}/>
                <MyBets activeLeagueId={activeLeagueId}/>
            </LeftContent>
            <RightContent>
                <Leaderboard activeLeagueId={activeLeagueId}/>
            </RightContent>
        </HomepageContainer>
    );
}