import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';

const HomepageContainer = styled(Box)({
    backgroundColor: "#FBF9F9",
    height: "90%",
    width: "95%",
    color: "black", 
    display: "flex", 
    justifyContent: "space-between",
    alignItems:"center",
    gap: "10px"
})

const LeftContent = styled(Box)({
    height:"100%", 
    width:"50%", 
    padding:"10px",
    display: "flex", 
    flexDirection:"column"
})

export function Homepage() {
    
    return (
        <HomepageContainer>
            <LeftContent>
                <Leagues/>
            </LeftContent>
        </HomepageContainer>
    );
}