import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';
import { MyBets } from './MyBets';

const HomepageContainer = styled(Box)({
    height: "100%",
    width: "100%",
    color: "#000000", 
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
    
    return (
        <HomepageContainer>
            <LeftContent>
                <Leagues/>
                <MyBets/>
            </LeftContent>
        </HomepageContainer>
    );
}