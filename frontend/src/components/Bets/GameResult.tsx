import { useEffect, useState } from "react"
import { gameDataSource } from "../../datasources";
import { Game } from "../../datasources/GameDataSource";
import { Box, styled } from "@mui/material";
import { darkBlue, green, white } from "../../utils/colors";
import { getCountryCode } from "../../utils/utilsBet";

const GameResultContainer = styled(Box)({
    display: "flex",
    width: "100%",
    gap: "10px",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
    color: white, 
    backgroundColor: darkBlue, 
    padding: "8px", 
    borderRadius: "12px",
});

interface GameResultProps {
    gameId: string
}

export function GameResult(props: GameResultProps){

    const [homeTeam, setHomeTeam] = useState<string|null>(null);
    const [awayTeam, setAwayTeam] = useState<string|null>(null);
    const [homeScore, setHomeScore] = useState<number|null>(null);
    const [awayScore, setAwayScore] = useState<number|null>(null);

    useEffect(()=> {
        if (!props.gameId)
            return;

        gameDataSource.getGameByID(props.gameId).then((game: Game|null) => {
            if (!game)
                return;
            setHomeTeam(game.homeTeam);
            setAwayTeam(game.awayTeam);
            if (!game.score)
                return;
            const scores: string[] = game.score.split("-");
            setHomeScore(Number(scores[0]));
            setAwayScore(Number(scores[1]));
        });
    }, [props.gameId])

    if (!homeTeam || !awayTeam)
        return <></>;

    return (
        <Box sx={{display: "flex"}}>
            <Box sx={{width: "20px"}}/> {/*Not clean but to match with the same box in GameBet*/}
        
            <GameResultContainer>
                <Box> {getCountryCode(homeTeam)} </Box>
                <Box sx={{display: "flex", width: "fit-content"}}>
                    {homeScore && awayScore &&
                        <Box sx={{color: homeScore > awayScore ? green : "inherit"}}> {homeScore} </Box>
                    }
                    <Box> - </Box>
                    {homeScore && awayScore &&
                        <Box sx={{color: awayScore > homeScore ? green : "inherit"}}> {awayScore} </Box>
                    }
                </Box>
                <Box> {getCountryCode(awayTeam)} </Box>

            </GameResultContainer>
        </Box>
    )
}