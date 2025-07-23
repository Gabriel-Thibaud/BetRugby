import { Box, styled} from '@mui/material';
import { GameBet } from './GameBet';

const MyBetsContainer = styled(Box)({
    height: "fit-content",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    border: "2px solid #D9D9D9", 
    boxShadow: "4px 8px #D9D9D9",
    borderRadius: "10px",
});

const UpContent = styled(Box)({
    width: "100%",
    display : "flex",
    justifyContent : "space-between"
});


const Content = styled(Box)({
    width: "100%",
    display : "flex",
    flexDirection: "column",
    alignItems:"center"
});

const DayContent = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-around",
    padding: "15px"
});

export function MyBets(){

    return(
        <MyBetsContainer>
            <UpContent>
                <Box sx={{fontWeight: "bold ", fontSize: "24px"}}> My Bets </Box>
            </UpContent>
            <Content>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 1  </Box>
                <DayContent>
                    <GameBet team1='IRL' team2='FRA'/>
                    <GameBet team1='ECO' team2='GAL'/>
                </DayContent>
                <Box sx={{fontWeight: "bold ", fontSize: "20px"}}> Day 2 </Box>
                <DayContent>
                    <GameBet team1='ANG' team2='ITA'/>
                </DayContent>
            </Content>
        </MyBetsContainer>
    );
}