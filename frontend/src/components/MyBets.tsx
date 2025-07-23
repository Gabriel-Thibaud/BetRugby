import { Box, styled} from '@mui/material';
import { GameBet } from './GameBet';

const MyBetsContainer = styled(Box)({
    height: "fit-content",
    maxWidth: "max(370px, 75vw)",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    border: "2px solid #D9D9D9", 
    boxShadow: "2px 5px #D9D9D9",
    borderRadius: "10px",
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
    padding: "15px"
});

export function MyBets(){

    return(
        <MyBetsContainer>
            <Title> My Bets </Title>
          
            <Content>
                  {/* TODO: Content has to be dynamic, so doing a loop over the days then a loop over the matchs of the day  */}
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 1  </Box>
                <DayContent>
                    <GameBet team1='IRL' team2='FRA'/>
                    <GameBet team1='ECO' team2='GAL'/>
                </DayContent>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 2 </Box>
                <DayContent>
                    <GameBet team1='ANG' team2='ITA'/>
                </DayContent>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 3 </Box>
                <DayContent>
                    <GameBet team1='ANG' team2='FRA'/>
                </DayContent>
            </Content>
        </MyBetsContainer>
    );
}