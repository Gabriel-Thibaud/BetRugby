import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, styled, TextField, Typography } from '@mui/material';

const BetContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px"
});

const Content = styled(Box)({
    display : "flex",
    flexDirection: "column", 
    alignItems: "center",
    gap: "5px"
});

const GameBetContent = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center", 
    gap: "5px", 
    fontWeight: "bold"
});

const PointsDifferenContent = styled(Box)({
    height: "fit-content",
    width: "fit-content",
    display: "flex",
    alignItems: "center", 
    gap: "5px", 
    fontSize: "14px"
});

const CustomButton = styled(Button)((prop:{is_clicked: number}) => ({
    backgroundColor : prop.is_clicked ? "#158030" : "#FBF9F9",
    color: prop.is_clicked ? "#FBF9F9" : "#5D737E", 
    border: "2px solid  #5D737E",
    borderRadius: "15px", 
    padding: "2px", 
    width: "60px", 
    fontWeight: "bold", 
    fontSize: "20px",
    "&:hover":{
        backgroundColor: "#158030",
        color : "#FBF9F9"
    }
}));

const WarningSign = styled(Box)({
    backgroundColor: "#CB1111",
    color: "#FBF9F9",
    fontWeight: "bold",
    borderRadius: "30px",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    fontSize: "20px"
});

interface GameBetProps {
    team1:string, team2:string
}

export function GameBet(props: GameBetProps){
    const [clicked, setClicked] = useState<string>();

    return(
        <BetContainer>
            <WarningSign> ! </WarningSign>
            <Content>
                <GameBetContent>
                    <CustomButton onClick={() => setClicked(props.team1)} 
                        is_clicked={Number(clicked === props.team1)}> 
                        {props.team1} 
                    </CustomButton>
                    vs
                    <CustomButton onClick={() => setClicked(props.team2)} 
                        is_clicked={Number(clicked === props.team2)}> 
                        {props.team2}
                    </CustomButton>
                </GameBetContent>
                <PointsDifferenContent>
                    point difference
                    <Select sx={{height:"30px", width: "90px"}}>
                        <MenuItem value="0-10">0-10</MenuItem>
                        <MenuItem value="11-20">11-20</MenuItem>
                        <MenuItem value="21-30">21-30</MenuItem>
                        <MenuItem value="31+">31+</MenuItem>
                    </Select>
                </PointsDifferenContent>
            </Content>
        </BetContainer>
    );
}