import { useEffect, useState } from "react";
import { gold, white } from "../../utils/colors";
import { Box, styled } from "@mui/material";
import { betDataSource } from "../../datasources";
import { Bet } from "../../datasources/BetDataSource";

const ScoreContainer = styled(Box)({
    display: "flex", 
    flexDirection: "column",
    border: `solid 3px ${gold}`,
    borderRadius: "12px",
    color: gold,
    padding: "10px",
    fontWeight: "bold"
});

const ScoreWrapper = styled(Box)({
    backgroundColor: gold,
    color: white,
    borderRadius: "25px",
    textAlign:"center",
    padding: "5px"
});

interface DailyScoreProps {
    gameIDs: string[],
    leagueId: string
}

export function DailyScore(props: DailyScoreProps){

    const [dailyScore, setDailyScore] = useState<number|null>(null);

    useEffect(() => {
        if (!props.leagueId || !props.gameIDs)
            return;
        getDailyScore().then((score: number) => setDailyScore(score));
    }, [props.gameIDs]);

    async function getDailyScore(): Promise<number> {
        let score: number = 0;
        for (const id of props.gameIDs){
            const bet: Bet|null = await betDataSource.getBet(props.leagueId, id);
            if (!bet || !bet.score)
                continue;
            score += bet.score;
        }
        return score;
    }

    return (
        <ScoreContainer>
            <Box> Score </Box>
            <ScoreWrapper>
                {dailyScore} 
            </ScoreWrapper>
        </ScoreContainer>
    );
}