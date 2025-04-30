import React, { useEffect, useState } from 'react';
import { backdropClasses, Box, Button, Stack, styled, TextField, Typography } from '@mui/material';

const LeaguesContainer = styled(Box)({
    height: "fit-content",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    border: "2px solid #D9D9D9", 
    boxShadow: "4px 8px #D9D9D9",
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
    boxShadow: "0px 3px #5D737E",
    borderRadius: "10px",
    fontWeight: "bold",
    "&:hover":{
        backgroundColor: "rgb(140, 109, 23)"
    }
});

const Content = styled(Box)({
    height:"fit-content",
    width: "100%",
    paddingBottom: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
});

const LeftContent = styled(Box)({
    height: "fit-content",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    gap: "5px"

});

const LeagueButton = styled(Box)((props:{is_active: number}) => ({
    fontWeight: props.is_active ? "bold" : "none",
    color: props.is_active ? "#158030" : "#000000",
    cursor: "pointer",
    "&:hover": {
    fontWeight : "bold"
    }
}));


const RightContent = styled(Box)({
    height: "fit-content",
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    gap: "20px"
});



export function Leagues(){
    const leaguesList: string[] = ["Fake League 1","Fake League 2","Fake League 3","Fake League 4",];
    const [activeLeague, setActiveLeague] = useState <string>(leaguesList[0]);

    return(
        <LeaguesContainer>
            <Title> My Leagues </Title>
            <Content>
                <LeftContent> 
                    {leaguesList.map((league)=>
                        <LeagueButton is_active={Number(activeLeague === league)}> {league} </LeagueButton>
                    )}
                </LeftContent>
                <RightContent>
                    <CustomButton> Create </CustomButton>
                    <CustomButton> Join </CustomButton>
                </RightContent>
            </Content> 
        </LeaguesContainer>
    );
}