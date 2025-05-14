import React, { useState } from 'react';
import { Box, Button, styled, Dialog, IconButton, Tooltip } from '@mui/material';
import { PopUpLeagues } from './PopUpLeagues';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LeaguesContainer = styled(Box)({
    height: "fit-content",
    width: "100%",
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
    width: "100%",
     alignItems: "center"
})

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

const ListContainer = styled(Box)({
    height:"fit-content",
    width: "100%",
    paddingBottom: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
});

const LeaguesList= styled(Box)({
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

const IdContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    fontSize: "12px", 
    color: "#D9D9D9",
})

type LeagueData = {
  id: string;
  name: string;
};



export function Leagues(){

    const [leagues, setLeagues] = useState <LeagueData[]>([]);
    const [activeLeague, setActiveLeague] = useState <LeagueData| null>(leagues[0]);
    const [selectedButton, setSelectedButton] = useState <string>("");
    const [isOpen, setIsOpen] = useState <boolean> (false);
    const handleClose = () => setIsOpen(false);



    return(
        <LeaguesContainer>
            <Dialog open={isOpen} onClose={handleClose}>
                <PopUpLeagues 
                    selectedButton={selectedButton} 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    onLeagueCreated={(league) => {setLeagues(prev => [...prev, league]); 
                    if (!activeLeague) setActiveLeague(league)}}/>
            </Dialog>
            <UpperContainer>
                <Title> 
                    My Leagues 
                </Title>
                {!activeLeague ? (
                    <Box sx={{widows: "100px"}}></Box>
                ):(
                    <IdContainer> 
                        <Box sx={{fontSize:"10px"}}>Invite frineds</Box>
                        <Box>ID : {activeLeague.id} </Box>
                        <IconButton onClick={() => navigator.clipboard.writeText(activeLeague.id)}>
                            <ContentCopyIcon fontSize="small" />    
                        </IconButton>  
                    </IdContainer>
                )}

            </UpperContainer>
            <ListContainer>
                <LeaguesList> 
                    {leagues.length === 0 ? (
                        "No league for now"
                        ) : (
                        leagues.map((league: LeagueData) => (
                        <LeagueItem  
                            key={league.name}
                            onClick={() => setActiveLeague(league)} 
                            is_active={Number(activeLeague === league)}
                        > 
                            {league.name}
                        </LeagueItem >))
                    )}
                </LeaguesList>
                <ButtonsContainer>
                    <CustomButton onClick={() => {setSelectedButton('create') ; setIsOpen(true)}}>
                        Create 
                    </CustomButton>
                    <CustomButton onClick={() => {setSelectedButton('join') ; setIsOpen(true)}}>
                        Join
                    </CustomButton>
                </ButtonsContainer>
            </ListContainer > 
        </LeaguesContainer>
    );
}