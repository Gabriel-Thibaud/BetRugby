import React, { useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';

const PopUpContainer = styled(Box)({
    height: "fit-content",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px"
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

interface PopupProps {
    selectedButton: string
    isOpen : boolean
    setIsOpen : (value: boolean) => void
};

export function PopUpLeagues(props: PopupProps){

    const [leagueName, setLeagueName] = useState<string>("");
    
    if (props.isOpen == false) return null;

    return(
        <PopUpContainer>
            <Box sx={{fontWeight: "bold", fontSize: "24px"}}>
                {props.selectedButton === "create" ? "League name" : "League ID"}
            </Box>
            <TextField 
                sx={{width: "200px"}}
                label={props.selectedButton === "create" ? "My League" : "ID"} 
                value={leagueName} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeagueName(e.target.value)}
            /> 
            <CustomButton onClick={() => props.setIsOpen(false)}>
                {props.selectedButton === "create" ? "Create" : "Join"}
            </CustomButton>
        </PopUpContainer>
    )
}