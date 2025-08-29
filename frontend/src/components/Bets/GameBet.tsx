import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, styled } from '@mui/material';
import { blue, darkBlue, gold, green, red, white } from '../../utils/colors';
import { getCountryCode } from '../../utils/utilsBet';
import { betDataSource, gameDataSource } from '../../datasources/index';
import { Game } from '../../datasources/GameDataSource';
import { Bet } from '../../datasources/BetDataSource';

const BetContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    "@media (max-width: 1010px)":{
        marginBottom: "10px"
    }
});

const TeamsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginLeft: "10px", 
    marginBottom: "5px",
    fontWeight: "bold", 
});

const TeamButton = styled(Button)((prop:{is_clicked: number, disable_bet: number}) => ({
    width: "60px", 
    backgroundColor : prop.is_clicked ? green : white,
    color: prop.is_clicked ? white : darkBlue, 
    border: `2px solid  ${blue}`,
    borderRadius: "15px", 
    padding: "2px",
    fontWeight: "bold", 
    fontSize: "20px",
    cursor: prop.disable_bet ? "default" : "pointer",
    ...(!prop.disable_bet &&
        {"&:hover":{
            backgroundColor: green,
            color : white
        }}
    )
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

const ScoreWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: gold
});

interface GameBetProps {
    gameId: string,
    activeLeagueId: string,
    disableBet: boolean  // disable the possibility to change the bet
}

export function GameBet(props: GameBetProps){
    const [homeTeam, setHomeTeam] = useState<string|null>(null);
    const [awayTeam, setAwayTeam] = useState<string|null>(null);
    const [predictedWinner, setPredictedWinner] = useState<string>("");
    const [diffenrenceSelected, setDifference] = useState<number|string>("");
    const [betScore, setBetScore] =  useState<number>(0);
   
    useEffect(()=> {
        if (!props.gameId)
            return;

        gameDataSource.getGameByID(props.gameId).then((game: Game|null) => {
            if (!game)
                return;
            setHomeTeam(game.homeTeam);
            setAwayTeam(game.awayTeam);
        });
    }, [])

    useEffect(()=> {
        if (!props.activeLeagueId)
            return;

        // check if user has already bet on the game
        betDataSource.getBet(props.activeLeagueId, props.gameId).then((bet: Bet|null) => {
            if (!bet) {
                setPredictedWinner("");
                setDifference("");
                return;
            }
            setDifference(bet.pointDiff);
            setPredictedWinner(bet.predictedWinner);
            setBetScore(bet.score ?? 0);
        });
    }, [props.activeLeagueId])

    useEffect(() => {

        if (!!predictedWinner && !!diffenrenceSelected && typeof diffenrenceSelected == 'number')
            betDataSource.createBet(props.activeLeagueId, props.gameId, diffenrenceSelected, predictedWinner)

    }, [predictedWinner, diffenrenceSelected]);

    function handleClickOnTeam(team:string){
        if (props.disableBet)
            return;
        setPredictedWinner(team);
    }

    if (!homeTeam || !awayTeam)
        return <></>;

    return(
        <BetContainer>
            <Box sx={{width: "20px"}}>
                {(!diffenrenceSelected || !predictedWinner ) && !props.disableBet &&
                    <WarningSign> ! </WarningSign>
                }
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <TeamsContainer>
                    <TeamButton 
                        onClick={() => handleClickOnTeam(homeTeam)} 
                        is_clicked={Number(predictedWinner === homeTeam)} 
                        disable_bet={Number(props.disableBet)}
                    > 
                        {getCountryCode(homeTeam)} 
                    </TeamButton>
                    vs
                    <TeamButton 
                        onClick={() => handleClickOnTeam(awayTeam)} 
                        is_clicked={Number(predictedWinner === awayTeam)} 
                        disable_bet={Number(props.disableBet)}
                    > 
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
                        disabled={props.disableBet}
                    >
                        <MenuItem value={10}>0-10</MenuItem>
                        <MenuItem value={20}>11-20</MenuItem>
                        <MenuItem value={30}>21-30</MenuItem>
                        <MenuItem value={31}>31+</MenuItem>
                    </Select>
                </PointsDifferentContainer>
            </Box>
            { props.disableBet &&
                <ScoreWrapper>
                    <Box> +{betScore} </Box> 
                </ScoreWrapper>
            }
        </BetContainer>
    );
}