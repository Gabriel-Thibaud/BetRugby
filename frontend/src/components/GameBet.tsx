import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, styled } from '@mui/material';
import { blue, darkBlue, green, red, white } from '../utils/colors';
import { Country, getCountryCode } from '../utils/utilsBet';

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
    backgroundColor : prop.is_clicked ? green : white,
    color: prop.is_clicked ? white : darkBlue, 
    border: `2px solid  ${blue}`,
    borderRadius: "15px", 
    padding: "2px",
    fontWeight: "bold", 
    fontSize: "20px",
    "&:hover":{
        backgroundColor: green,
        color : white
    }
}));

const PointsDifferentContainer = styled(Box)({
    display: "flex",
    alignItems: "center", 
    fontSize: "12px"
});

const WarningSign = styled(Box)({
    width: "16px",
    height: "16px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: red,
    color: white,
    fontWeight: "bold",
    borderRadius: "30px",
    fontSize: "14px"
});

interface GameBetProps {
    team1: keyof typeof Country;
    team2: keyof typeof Country;
}

export function GameBet(props: GameBetProps){
    const [clicked, setClicked] = useState<string>();
    const [diffenrenceSelected, setDifference] = useState<string>("");

    useEffect(() => {

        if (!!clicked && !!diffenrenceSelected)
            handleNewBet().then();

    }, [clicked, diffenrenceSelected])

    async function handleNewBet(){
        
    }

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
                        {getCountryCode(props.team1)} 
                    </TeamButton>
                    vs
                    <TeamButton onClick={() => setClicked(props.team2)} is_clicked={Number(clicked === props.team2)}> 
                        {getCountryCode(props.team2)}
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