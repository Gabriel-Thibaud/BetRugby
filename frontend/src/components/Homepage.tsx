import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';

const HomepageContainer = styled(Box)({
    height: "100%",
    width: "100%",
    display: "flex", 
    justifyContent: "space-around",
    alignItems:"center", 
    flexWrap: "wrap"
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