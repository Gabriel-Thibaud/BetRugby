import { Box, styled } from "@mui/material";
import { Section } from "../../widgets/Section";
import { blue, darkBlue, gold, white } from "../../utils/colors";

const LeaguesSection = styled(Section)({
    height: "fit-content",
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
    gap: "20px"
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
})

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
})

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


export function Leaderboard(){

    const ranking = [1,2,3,4,5,6,7,8,9,10];

    const sortedNames = ["Gab", "Cams", "CassouilleFripouille", "Nyny Bezos", "Marine La star", "Kimy baby", "Manaaang BANG", 
        "Coquine 1", "Coquine 2","Grand perdant 1", "Le nullos", "Orochimaru-san", "Casse noisette II","Grand perdant 2",
        "Grand perdant 3", "Grand perdant 4"
    ]

    const currentUserName = "Orochimaru-san";

    let score = 30;
    return (
        <LeaguesSection>
            <Title> Leaderboard </Title>
            <PodiumSection>
                <PositionContent>
                    <RankingNumber sx={{backgroundColor: darkBlue}}> 2 </RankingNumber>
                    <Box sx={{textAlign: "center"}}> {sortedNames[1]} </Box>
                    <SecondPositionBloc> {65} </SecondPositionBloc>
                </PositionContent>
                <PositionContent>
                    <RankingNumber sx={{backgroundColor: gold}}> 1 </RankingNumber>
                    <Box sx={{textAlign: "center"}}> {sortedNames[0]} </Box>
                    <FirstPositionBloc> {82} </FirstPositionBloc>
                </PositionContent>
                <PositionContent>
                    <RankingNumber sx={{backgroundColor: blue}}> 3 </RankingNumber>
                    <Box sx={{textAlign: "center"}}> {sortedNames[2]} </Box>
                    <ThirdPositionBloc> {39} </ThirdPositionBloc>
                </PositionContent>

            </PodiumSection>
            <OtherRankList>
                {sortedNames.slice(3).map((name, index)=> 
                    <Box sx={{padding: "5px 15px 5px 5px", fontWeight: currentUserName === name ? "bold": "normal"}} key={index}>
                        {index + 3}. {name}  | {score--}
                    </Box>
                )}
            </OtherRankList>
              
        </LeaguesSection>
    );
}