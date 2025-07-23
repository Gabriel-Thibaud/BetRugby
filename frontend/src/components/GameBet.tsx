import { useState } from 'react';
import { Box, Button, MenuItem, Select, styled } from '@mui/material';

const BetContainer = styled(Box)({
    display: "flex",
    alignItems: "center"
});

const TeamsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginLeft: "10px", 
    marginBottom: "5px",
    fontWeight: "bold", 
});

const TeamButton = styled(Button)((prop:{is_clicked: number}) => ({
    width: "60px", 
    backgroundColor : prop.is_clicked ? "#158030" : "#FBF9F9",
    color: prop.is_clicked ? "#FBF9F9" : "#5D737E", 
    border: "2px solid  #5D737E",
    borderRadius: "15px", 
    padding: "2px",
    fontWeight: "bold", 
    fontSize: "20px",
    "&:hover":{
        backgroundColor: "#158030",
        color : "#FBF9F9"
    }
}));

const PointsDifferentContainer = styled(Box)({
    display: "flex",
    alignItems: "center", 
    fontSize: "14px"
});

const WarningSign = styled(Box)({
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#CB1111",
    color: "#FBF9F9",
    fontWeight: "bold",
    borderRadius: "30px",
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
                <TeamsContainer>
                    <TeamButton onClick={() => setClicked(props.team1)} is_clicked={Number(clicked === props.team1)}> 
                        {props.team1} 
                    </TeamButton>
                    vs
                    <TeamButton onClick={() => setClicked(props.team2)} is_clicked={Number(clicked === props.team2)}> 
                        {props.team2}
                    </TeamButton>
                </TeamsContainer>
                <PointsDifferentContainer>
                    <Box sx={{width: "70px", textAlign: "center"}}> 
                        Point difference
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
                </PointsDifferentContainer>
            </Box>
        </BetContainer>
    );
}