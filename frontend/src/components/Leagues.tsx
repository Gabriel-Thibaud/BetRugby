import { useEffect, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { LeaguesDialog } from './LeaguesDialog';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { userDataSource } from '../datasources/index';
import { League, DialogType } from '../datasources/LeagueDataSource';
import { blue, darkBlue, darkGold, gold, green, lightGray, red, white } from '../utils/colors';

const LeaguesContainer = styled(Box)({
    height: "fit-content",
    maxWidth: "max(370px, 75vw)",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    border: `2px solid ${blue}`,
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: white
});

const Header = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px"
});

const Title = styled(Box)({
    display: "flex",
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: "24px"
});

const CustomButton = styled(Button)({
    backgroundColor: gold,
    color: white,
    borderRadius: "10px",
    fontWeight: "bold",
    "&:hover":{
        backgroundColor: darkGold
    }
});

const LeaguesContent = styled(Box)({
    height:"fit-content",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "15px"
});

const ListContainer= styled(Box)({
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "5px"
});

const LeagueItem = styled(Box)((props:{is_active: number}) => ({
    fontWeight: props.is_active ? "bold" : "none",
    color: props.is_active ? green : darkBlue,
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
    color: lightGray
});

const IdContainer = styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    minWidth: "110px",
    gap:"5px",
    ":hover": {
        color: darkBlue,
        cursor: "pointer"
    },
    "svg": {
        width: "16px",
        height: "16px"
    }
});

export function Leagues(){

    const [leagueList, setLeagueList] = useState <League[]>([]);
    const [activeLeagueId, setActiveLeagueId] = useState <string>("");
    const [idPreview, setIdPreview] = useState <string>("");
    const [dialogType, setDialogType] = useState <DialogType>(DialogType.CREATE);
    const [isCopied, setIsCopied] = useState <boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState <boolean>(false);
    const [errorMessage, setErrorMessage] = useState <string>("");

    useEffect(() => {
        getLeagueList();
    },[]);

    useEffect(()=> {
        if (!activeLeagueId)
            return;

        const preview: string = `${activeLeagueId.substring(0,5)}...${activeLeagueId.substring(activeLeagueId.length - 3)}`;
        setIdPreview(preview);
    }, [activeLeagueId])

    async function getLeagueList() {
        const leagueList: League[] | null = await userDataSource.getUserLeagueList();

        if (!leagueList){
            setErrorMessage("Fail to fetch leagues");
            return;
        }
      
        setLeagueList(leagueList);
        if (!activeLeagueId && leagueList.length)
            setActiveLeagueId(leagueList[0].id);
         
    }

    function copyIdToClipBoard() {
        if (!activeLeagueId || isCopied)
            return;
   
        navigator.clipboard.writeText(activeLeagueId);   
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    async function onLeagueUpdate() {
        setIsDialogOpen(false);
        getLeagueList();
    }

    function openDialog(dialogType: DialogType) {
        setIsDialogOpen(true);
        setDialogType(dialogType);
    }

    return(
        <LeaguesContainer>
            <Header>
                <Title> My Leagues </Title>
                {activeLeagueId &&
                    <InviteInformation> 
                        <Box sx={{fontSize:"10px", paddingRight: "1px"}}> Invite friends </Box>
                        <IdContainer onClick={() => copyIdToClipBoard()}>
                        {isCopied ?
                            <Box sx={{color: darkBlue}}> ID copied ! </Box>
                            :
                            <>
                                <Box>ID: { idPreview } </Box>
                                <ContentCopyIcon fontSize="small" />
                            </>
                        }
                        </IdContainer>
                    </InviteInformation>
                }               
            </Header>
            <LeaguesContent>
                <ListContainer> 
                    {leagueList.length === 0 ? 
                        <Box> No league for now </Box>
                    : 
                        leagueList.map((league: League) =>
                            <LeagueItem  
                                key={league.id}
                                onClick={() => setActiveLeagueId(league.id)} 
                                is_active={Number(activeLeagueId === league.id)}
                            > 
                                {league.name}
                            </LeagueItem >
                        )
                    }
                    {errorMessage &&
                        <Box sx={{color: red, fontSize: "12px"}}> {errorMessage} </Box>
                    }
                </ListContainer>
                <ButtonsContainer>
                    <CustomButton onClick={() => {openDialog(DialogType.CREATE)}}>
                        Create 
                    </CustomButton>
                    <CustomButton onClick={() => {openDialog(DialogType.JOIN)}}>
                        Join
                    </CustomButton>
                </ButtonsContainer>

            </LeaguesContent >
            {isDialogOpen && 
                <LeaguesDialog
                    dialogType={dialogType}
                    onClose={() => setIsDialogOpen(false)}
                    onUpdate={() => onLeagueUpdate()}
                />
            }
        </LeaguesContainer>
    );
}