import React, { useState } from 'react';
import { Box, Button, styled, Dialog } from '@mui/material';
import { PopUpLeagues } from './PopUpLeagues';

const LeaguesContainer = styled(Box)({
    height: "fit-content",
    minWidth: "300px",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    border: "2px solid #D9D9D9", 
    boxShadow: "2px 5px #D9D9D9",
    borderRadius: "10px",
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

const ContentContainer = styled(Box)({
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

export function Leagues(){

    const leaguesList: string[] = ["Fake League 1","Fake League 2","Fake League 3","Fake League 4",];
    const [activeLeague, setActiveLeague] = useState <string>(leaguesList[0]);
    const [selectedButton, setSelectedButton] = useState <string>("");
    const [isOpen, setIsOpen] = useState <boolean> (false);
    const handleClose = () => setIsOpen(false);

    return(
        <LeaguesContainer>
            <Dialog open={isOpen} onClose={handleClose}>
                <PopUpLeagues selectedButton={selectedButton} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </Dialog>
            <Title> My Leagues </Title>
            <ContentContainer >
                <LeaguesList> 
                    {leaguesList.map((league)=>
                        <LeagueItem  
                            key={league}
                            onClick={() => setActiveLeague(league)} 
                            is_active={Number(activeLeague === league)}
                        > 
                            {league} 
                        </LeagueItem >
                    )
                    }
                </LeaguesList>
                <ButtonsContainer>
                    <CustomButton onClick={() => {setSelectedButton('create') ; setIsOpen(true)}}>
                        Create 
                    </CustomButton>
                    <CustomButton onClick={() => {setSelectedButton('join') ; setIsOpen(true)}}>
                        Join
                    </CustomButton>
                </ButtonsContainer>
            </ContentContainer > 
        </LeaguesContainer>
    );
}