import React, { useState } from 'react';
import { Box, Button, styled, TextField, Dialog } from '@mui/material';
import { leagueDataSource } from '../datasources/index';
import { DialogType } from '../datasources/LeagueDataSource';
import { darkBlue, darkGold, gold, lightGray, red, white } from '../utils/colors';

const PopUpContainer = styled(Box)({
    height: "fit-content",
    padding: "15px",
    display: "flex", 
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    color: darkBlue
});

const CustomButton = styled(Button)({
    backgroundColor: gold,
    color: white,
    boxShadow: `0px 3px ${lightGray}`,
    borderRadius: "10px",
    fontWeight: "bold",
    ":hover":{
        backgroundColor: darkGold,
        boxShadow: "none"
    }
});

interface DialogProps {
    dialogType: DialogType;
    onClose : () => void;
    onUpdate : () => void;
};

export function LeaguesDialog(props: DialogProps){

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");

    const isCreateDialog: boolean = props.dialogType === DialogType.CREATE;
        
    async function updateLeagues() {
        if (!userInput.trim()){
            displayErrorMessage();
            return;
        }

        let leagueStatus: {error: string} = {error: ""};
	        if (isCreateDialog)
	            leagueStatus = await leagueDataSource.createLeague(userInput.trim());    
	        else
	            leagueStatus = await leagueDataSource.joinLeague(userInput.trim());
	
	        if (leagueStatus.error) {
	            setErrorMessage(leagueStatus.error);
	            return;
	        }
        props.onUpdate()
    }

    async function handleInputChange(value: string){
        if (!value.trim())
            displayErrorMessage();
        
        if (!!errorMessage && !!value.trim())
            setErrorMessage("");

        setUserInput(value);
    }

    function displayErrorMessage(){
        const errorMsg: string = isCreateDialog ? "Error: league name is required" : "Error: ID league is required";
        setErrorMessage(errorMsg);
    }

    return(
        <Dialog open={true} onClose={() => props.onClose()}>
            <PopUpContainer>
            <Box sx={{fontWeight: "bold", fontSize: "24px"}}>
                {isCreateDialog ? "League name" : "League ID"}
            </Box>
            <TextField 
                sx={{width: "200px"}}
                label={isCreateDialog ? "My League" : "ID"} 
                value={userInput} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)} 
            /> 
            {errorMessage &&
                <Box sx={{color: red, fontSize: "12px"}}> {errorMessage} </Box>
            }
            <CustomButton onClick={() => updateLeagues()}>
                {isCreateDialog ? "Create" : "Join"}
            </CustomButton>
            </PopUpContainer>
        </Dialog>
    )
}