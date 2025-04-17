import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';

const AppContainer = styled(Box)({
  backgroundColor: "#282c34",
  height: "100%",
  width: "100%"
});

const AppHeader = styled(Box)({
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white"
});

function App() {

  useEffect(() => {
    fetch("http://localhost:3001")
    .then((res) => res.text())
    .then((data) => console.log(data));
  }, []);


  return (
    <AppContainer>
      <AppHeader>
        <Box sx={{fontSize: 42}}> BetRugby ! </Box>
        <Box>
          Bet on Rugby with your friends
        </Box>
      </AppHeader>
    </AppContainer>
  );
}

export default App;
