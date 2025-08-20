import { Box, styled } from "@mui/material";
import { Section } from "../../widgets/Section";
import { blue, darkBlue, gold, white } from "../../utils/colors";
import { useEffect, useState } from "react";
import { leagueDataSource, userDataSource } from "../../datasources";

const LeaguesSection = styled(Section)({
    minHeight: "350px",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
});

const Title = styled(Box)({
    display: "flex",
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: "24px"
});

const PodiumSection = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    margin: "auto"
});

const PositionContent = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",
    fontWeight: "bold"
});

const RankingNumber = styled(Box)({
    fontSize: "18px",
    textAlign:"center",
    color: white,
    height: "24px",
    width: "24px",
    borderRadius: "20px"
});

const Bloc = styled(Box)({
    width: "100%",
    minWidth: "90px",
    color: white,
    fontWeight: "bold",
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "10%",
    borderTopRightRadius: "10%"
});

const SecondPositionBloc = styled(Bloc)({
    height: "90px",
    backgroundColor: darkBlue
});

const FirstPositionBloc = styled(Bloc)({
    height: "120px",
    backgroundColor: gold
});

const ThirdPositionBloc = styled(Bloc)({
    height: "60px",
    backgroundColor: blue
});

const OtherRankList = styled(Box)({
    maxHeight: "52vh",
    width: "100%",
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

const UserRanking = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

interface LeaderboardProps {
    activeLeagueId: string
}

export function Leaderboard(props: LeaderboardProps){

    const [usernameAndScore, setUsernameAndScore] = useState<{ userId: string, username: string, score: number }[]>([]);
    const [currentUsername, setCurrentUsername] = useState<string>("");

    useEffect(() => {
        userDataSource.getCurrentUsername().then((username: string) => setCurrentUsername(username));
    }, []);
    
    useEffect(() => {
        if (!props.activeLeagueId)
            return;
        leagueDataSource.getLeagueUserScore(props.activeLeagueId).then((scores) => {
            scores.sort((a, b) => b.score - a.score); // sort in descending order
            setUsernameAndScore(scores);
        });
    },[props.activeLeagueId]);

    return (
        <LeaguesSection>
            <Title> Leaderboard </Title>
            { usernameAndScore.length === 0 ?
                <Box sx={{margin: "auto"}}> Join a league to unlock the leaderboard ! </Box>
            :
                <>
                    <PodiumSection>
                            <PositionContent>
                                <RankingNumber sx={{backgroundColor: darkBlue}}> 2 </RankingNumber>
                                <Box sx={{textAlign: "center"}}> {usernameAndScore[1]?.username ?? ""} </Box>
                                <SecondPositionBloc> {usernameAndScore[1]?.score ?? 0} </SecondPositionBloc>
                            </PositionContent>
                        <PositionContent>
                            <RankingNumber sx={{backgroundColor: gold}}> 1 </RankingNumber>
                            <Box sx={{textAlign: "center"}}> {usernameAndScore[0].username} </Box>
                            <FirstPositionBloc> {usernameAndScore[0].score} </FirstPositionBloc>
                        </PositionContent>
                            <PositionContent>
                                <RankingNumber sx={{backgroundColor: blue}}> 3 </RankingNumber>
                                <Box sx={{textAlign: "center"}}> {usernameAndScore[2]?.username ?? ""} </Box>
                                <ThirdPositionBloc> {usernameAndScore[2]?.score ?? 0 } </ThirdPositionBloc>
                            </PositionContent>
                    </PodiumSection>
                    {usernameAndScore.length > 3 &&
                        <OtherRankList>
                            {usernameAndScore.slice(3).map((element, index)=>
                                <UserRanking  key={index}>
                                    <Box sx={{fontWeight: currentUsername === element.username ? "bold": "normal"}}>
                                        {index + 4}. {element.username}
                                    </Box>
                                    <Box sx={{padding: "5px 15px 5px 5px"}}>{element.score}</Box>
                                </UserRanking> 
                            )}
                        </OtherRankList>
                    }
                </>
            }    
        </LeaguesSection>
    );
}