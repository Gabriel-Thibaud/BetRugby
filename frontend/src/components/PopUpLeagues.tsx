import React, { useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';
import { leagueDataSource } from '../datasources/index';

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

interface PopupProps {
    selectedButton: string
    onClose : (value: boolean) => void
    onUpdate : () => void
};

export function PopUpLeagues(props: PopupProps){

    const [leagueName, setLeagueName] = useState<string>("");
    const [leagueId, setLeagueId] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
        
    async function handleAddLeagueToBackend() {
        if (props.selectedButton === "create"){
            const leagueStatus= await leagueDataSource.createLeague(leagueName.trim());
            if (leagueStatus.error) {
                setErrorMessage(leagueStatus.error);
                return;
            }

        } else {
            const result = await leagueDataSource.joinLeague(leagueId.trim());
            if (result.error) {
                setErrorMessage(result.error);
                return;
            }
        }
        props.onUpdate()
    }

    return(
        <PopUpContainer>
            <Box sx={{fontWeight: "bold", fontSize: "24px"}}>
                {props.selectedButton === "create" ? "League name" : "League ID"}
            </Box>
            <TextField 
                sx={{width: "200px"}}
                label={props.selectedButton === "create" ? "My League" : "ID"} 
                value={props.selectedButton === "create" ? leagueName : leagueId} 
                onChange={props.selectedButton === "create" ? 
                    (e: React.ChangeEvent<HTMLInputElement>) => setLeagueName(e.target.value) :
                    (e: React.ChangeEvent<HTMLInputElement>) => setLeagueId(e.target.value)
                } 
            /> 
            {errorMessage &&(
                <>
                    {props.onClose(false)}
                    <Box sx={{color: "#CB1111", fontSize: "12px"}}> {errorMessage} </Box>
                </>
            )}
            <CustomButton onClick={() => {handleAddLeagueToBackend()}}>
                {props.selectedButton === "create" ? "Create" : "Join"}
            </CustomButton>
        </PopUpContainer>
    )
}