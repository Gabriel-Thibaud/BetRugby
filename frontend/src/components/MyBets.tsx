import { Box, styled} from '@mui/material';
import { GameBet } from './GameBet';
import { Section } from '../widgets/Section';

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

export function MyBets(){

    return(
        <MyBetsSection>
            <Title> My Bets </Title>
          
            <Content>
                  {/* TODO: Content has to be dynamic, so doing a loop over the days then a loop over the matchs of the day  */}
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 1  </Box>
                <DayContent>
                    <GameBet team1="Ireland Women" team2="France Women"/>
                    <GameBet team1="Canada Women" team2="USA Women"/>
                </DayContent>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 2 </Box>
                <DayContent>
                    <GameBet team1="England Women" team2="Ireland Women"/>
                </DayContent>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 3 </Box>
                <DayContent>
                    <GameBet team1="England Women" team2="France Women"/>
                </DayContent>
            </Content>
        </MyBetsSection>
    );
}