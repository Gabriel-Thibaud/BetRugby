import { useEffect, useState } from 'react';
import { Box, Button, styled, Dialog } from '@mui/material';
import { PopUpLeagues } from './PopUpLeagues';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LeaguesContainer = styled(Box)({
    height: "fit-content",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    border: "2px solid #D9D9D9", 
    boxShadow: "2px 5px #D9D9D9",
    borderRadius: "10px",
});

const UpperContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-around",
    gap: "50px",
    alignItems: "center"
});

const Title = styled(Box)({
    fontWeight: "bold",
    fontSize: "24px",
    display: "flex",
    alignSelf: "flex-start",
});

const CustomButton = styled(Button)({
    backgroundColor: " #E5B226",
    color: "#FBF9F9",
    boxShadow: "0px 3px #D9D9D9",
    borderRadius: "10px",
    fontWeight: "bold",
    "&:hover":{
        backgroundColor: "rgb(140, 109, 23)",
        boxShadow: "none"
    }
});

const MiddleContainer = styled(Box)({
    height:"fit-content",
    width: "100%",
    paddingBottom: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
});

const ListContainer= styled(Box)({
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "5px"
});

const LeagueItem = styled(Box)((props:{is_active: number}) => ({
    fontWeight: props.is_active ? "bold" : "none",
    color: props.is_active ? "#158030" : "#000000",
    cursor: "pointer",
    "&:hover": {
        fontWeight : "bold"
    }
}));

const ButtonsContainer= styled(Box)({
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    gap: "20px"
});

const InviteInformation = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    fontSize: "12px", 
    color: "#D9D9D9",
});

const IdContainer = styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    minWidth: "110px",
    gap:"5px",
    ":hover": {
        color: "black",
        cursor: "pointer"
    },
    "svg": {
        width: "16px",
        height: "16px"
    }
});

type League = {
  id: string;
  name: string;
};

export function Leagues(){

    const [leagueList, setLeagueList] = useState <League[]>([]);
    const [activeLeague, setActiveLeague] = useState <League | null>(leagueList[0]);
    const [IdPreview, setIdPreview] = useState<string>("")
    const [selectedButton, setSelectedButton] = useState <string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState <boolean> (false);

    useEffect(()=> {
        if (!activeLeague)
            return;

        const preview: string = `${activeLeague.id.substring(0,5)}...${activeLeague.id.substring(activeLeague.id.length - 3)}`;
        setIdPreview(preview);

    }, [activeLeague])

    function onAddLeagueToList(league: League) {
        setLeagueList(prev => [...prev, league]); 
        if (!activeLeague) 
            setActiveLeague(league);
    }

    function copyIdToClipBoard() {
        if (!activeLeague || isCopied)
            return;
   
        navigator.clipboard.writeText(activeLeague.id);   
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    return(
        <LeaguesContainer>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <PopUpLeagues 
                    selectedButton={selectedButton} 
                    onClose={(isClose: boolean) => setIsDialogOpen(!isClose)} 
                    onAddLeague={(league) => onAddLeagueToList(league)}
                />
            </Dialog>
            <UpperContainer>
                <Title> My Leagues </Title>
                {activeLeague &&
                    <InviteInformation> 
                        <Box sx={{fontSize:"10px", paddingRight: "1px"}}> Invite friends </Box>
                        <IdContainer onClick={() => copyIdToClipBoard()}>
                        {isCopied ?
                            <Box sx={{color: "black"}}> ID copied ! </Box>
                            :
                            <>
                                <Box>ID: { IdPreview } </Box>
                                <ContentCopyIcon fontSize="small" />
                            </>
                        }
                        </IdContainer>
                       
                    </InviteInformation>
                }               
            </UpperContainer>
            <MiddleContainer>
                <ListContainer> 
                    {leagueList.length === 0 ? 
                        <Box> No league for now </Box>
                    : 
                        leagueList.map((league: League) =>
                            <LeagueItem  
                                key={league.id}
                                onClick={() => setActiveLeague(league)} 
                                is_active={Number(activeLeague === league)}
                            > 
                                {league.name}
                            </LeagueItem >
                        )
                    }
                </ListContainer>
                <ButtonsContainer>
                    <CustomButton onClick={() => {setSelectedButton('create') ; setIsDialogOpen(true)}}>
                        Create 
                    </CustomButton>
                    <CustomButton onClick={() => {setSelectedButton('join') ; setIsDialogOpen(true)}}>
                        Join
                    </CustomButton>
                </ButtonsContainer>
            </MiddleContainer > 
        </LeaguesContainer>
    );
}