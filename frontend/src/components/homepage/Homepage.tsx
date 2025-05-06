import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { Leagues } from './Leagues';
import { MyBets } from './MyBets';

const HomepageContainer = styled(Box)({
    height: "100%",
    width: "100%",
    padding: "15px",
    color: "#000000", 
    display: "flex", 
    justifyContent: "space-around",
    alignItems:"center"
});

const LeftContent = styled(Box)({
    height: "100%",
    display: "flex", 
    flexDirection:"column",
    justifyContent: "space-around"
});

const RightContent = styled(Box)({
    display: "flex",
    padding: "15px",
})

export function Homepage() {
    
    return (
        <HomepageContainer>
            <LeftContent flex={1}>
                <Leagues/>
                <MyBets/>
            </LeftContent>
            <RightContent flex={1}>
            </RightContent>
        </HomepageContainer>
    );
}