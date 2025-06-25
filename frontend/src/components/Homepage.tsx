import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';

const HomepageContainer = styled(Box)({
    height: "100%",
    width: "100%",
    color: "#000000", 
    display: "flex", 
    justifyContent: "space-around",
    alignItems:"center"
});

const LeftContent = styled(Box)({
    display: "flex", 
    flexDirection:"column",
    justifyContent: "space-around"
});


export function Homepage() {
    
    return (
        <HomepageContainer>
            <LeftContent>
                <Leagues/>
            </LeftContent>
        </HomepageContainer>
    );
}