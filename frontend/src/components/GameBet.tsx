import { useState } from 'react';
import { Box, Button, MenuItem, Select, styled } from '@mui/material';

const BetContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
});

const GameBetContent = styled(Box)({
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold", 
    gap: "5px",
    alignItems: "center",
    marginLeft: "10px", 
    marginBottom: "5px"
});

const PointsDifferenContent = styled(Box)({
    display: "flex",
    alignItems: "center", 
    fontSize: "14px"
});

const CustomButton = styled(Button)((prop:{is_clicked: number}) => ({
    backgroundColor : prop.is_clicked ? "#158030" : "#FBF9F9",
    color: prop.is_clicked ? "#FBF9F9" : "#5D737E", 
    border: "2px solid  #5D737E",
    borderRadius: "15px", 
    padding: "2px", 
    width: "60px", 
    fontWeight: "bold", 
    fontSize: "20px",
    "&:hover":{
        backgroundColor: "#158030",
        color : "#FBF9F9"
    }
}));

const WarningSign = styled(Box)({
    backgroundColor: "#CB1111",
    color: "#FBF9F9",
    fontWeight: "bold",
    borderRadius: "30px",
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    fontSize: "20px"
});

interface GameBetProps {
    team1: string;
    team2: string;
}

export function GameBet(props: GameBetProps){
    const [clicked, setClicked] = useState<string>();
    const [diffenrenceSelected, setDifference] = useState<string>("");

    return(
        <BetContainer>
            <Box sx={{width: "20px"}}>
            {(!diffenrenceSelected || !clicked) && 
                <WarningSign> ! </WarningSign>
            }
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <GameBetContent>
                    <CustomButton onClick={() => setClicked(props.team1)} is_clicked={Number(clicked === props.team1)}> 
                        {props.team1} 
                    </CustomButton>
                    vs
                    <CustomButton onClick={() => setClicked(props.team2)} is_clicked={Number(clicked === props.team2)}> 
                        {props.team2}
                    </CustomButton>
                </GameBetContent>
                <PointsDifferenContent>
                    <Box sx={{width: "70px", textAlign: "center"}}> 
                        point difference
                    </Box>
                    <Select 
                        sx={{height:"30px", width: "90px"}}
                        value={diffenrenceSelected}
                        onChange={(e) => setDifference(e.target.value)}
                    >
                        <MenuItem value="0-10">0-10</MenuItem>
                        <MenuItem value="11-20">11-20</MenuItem>
                        <MenuItem value="21-30">21-30</MenuItem>
                        <MenuItem value="31+">31+</MenuItem>
                    </Select>
                </PointsDifferenContent>
            </Box>
        </BetContainer>
    );
}