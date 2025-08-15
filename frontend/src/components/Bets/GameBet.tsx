import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, styled } from '@mui/material';
import { blue, darkBlue, green, red, white } from '../../utils/colors';
import { getCountryCode } from '../../utils/utilsBet';
import { betDataSource, gameDataSource } from '../../datasources/index';
import { Game } from '../../datasources/GameDataSource';

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
    gameID: string
}

export function GameBet(props: GameBetProps){
    const [predictedWinner, setPredictedWinner] = useState<string>();
    const [diffenrenceSelected, setDifference] = useState<number|string>("");
    const [homeTeam, setHomeTeam] = useState<string|null>(null);
    const [awayTeam, setAwayTeam] = useState<string|null>(null);

    useEffect(()=> {
        gameDataSource.getGameByID(props.gameID).then((game: Game|null)=> {
            if(!game)
                return;
            setHomeTeam(game.homeTeam);
            setAwayTeam(game.awayTeam);
        });
    }, [])

    useEffect(() => {

        if (!!predictedWinner && !!diffenrenceSelected && typeof diffenrenceSelected == 'number')
            betDataSource.createBet(props.gameID, diffenrenceSelected, predictedWinner)

    }, [predictedWinner, diffenrenceSelected])

    if (!homeTeam || !awayTeam)
        return <></>;

    return(
        <BetContainer>
            <Box sx={{width: "20px"}}>
            {(!diffenrenceSelected || !predictedWinner) && 
                <WarningSign> ! </WarningSign>
            }
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <TeamsContainer>
                    <TeamButton onClick={() => setPredictedWinner(homeTeam)} is_clicked={Number(predictedWinner === homeTeam)}> 
                        {getCountryCode(homeTeam)} 
                    </TeamButton>
                    vs
                    <TeamButton onClick={() => setPredictedWinner(awayTeam)} is_clicked={Number(predictedWinner === awayTeam)}> 
                        {getCountryCode(awayTeam)}
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
                        <MenuItem value={10}>0-10</MenuItem>
                        <MenuItem value={20}>11-20</MenuItem>
                        <MenuItem value={30}>21-30</MenuItem>
                        <MenuItem value={31}>31+</MenuItem>
                    </Select>
                </PointsDifferentContainer>
            </Box>
        </BetContainer>
    );
}