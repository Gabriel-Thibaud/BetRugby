import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';
import { MyBets } from './MyBets';
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
    display: "flex", 
    flexDirection:"column",
    justifyContent: "space-around"
});


export function Homepage() {
    
    const [activeLeagueId, setActiveLeagueId] = useState <string>("");

    return (
        <HomepageContainer>
            <LeftContent>
                <Leagues activeLeagueId={activeLeagueId} onLeagueUpdate={(leagueId: string) => setActiveLeagueId(leagueId)}/>
                <MyBets activeLeagueId={activeLeagueId}/>
            </LeftContent>
        </HomepageContainer>
    );
}