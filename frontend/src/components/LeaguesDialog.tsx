import React, { useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';
import { leagueDataSource } from '../datasources/index';
import { DialogType } from '../datasources/LeagueDataSource';

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
    ":hover":{
        backgroundColor: "rgb(140, 109, 23)",
        boxShadow: "none"
    }
});

interface DialogProps {
    dialogType: DialogType;
    onClose : (value: boolean) => void;
    onUpdate : () => void;
};

export function LeaguesDialog(props: DialogProps){

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");

    const isCreateDialog: boolean = props.dialogType === DialogType.CREATE;
        
    async function handleAddLeagueToBackend() {// changer de nom
        if (isCreateDialog){
            const leagueStatus: {error: string} = await leagueDataSource.createLeague(userInput.trim());
            if (leagueStatus.error) {
                setErrorMessage(leagueStatus.error);
                return;
            }

        } else {
            const leagueStatus: {error: string} = await leagueDataSource.joinLeague(userInput.trim());
            if (leagueStatus.error) {
                setErrorMessage(leagueStatus.error);
                return;
            }
        }
        props.onUpdate()
        // pourrait être encore plus optimisé je pense
    }

    return(
        <PopUpContainer>
            <Box sx={{fontWeight: "bold", fontSize: "24px"}}>
                {isCreateDialog ? "League name" : "League ID"}
            </Box>
            <TextField 
                sx={{width: "200px"}}
                label={isCreateDialog ? "My League" : "ID"} 
                value={userInput} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)} 
            /> 
            {errorMessage &&
                <Box sx={{color: "#CB1111", fontSize: "12px"}}> {errorMessage} </Box>
            }
            <CustomButton onClick={() => {handleAddLeagueToBackend()}}>
                {isCreateDialog ? "Create" : "Join"}
            </CustomButton>
        </PopUpContainer>
    )
}