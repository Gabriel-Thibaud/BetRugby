import { Box, styled } from '@mui/material';
import { Menu } from './components/Menu';
import { Login } from './components/Login';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { Homepage } from './components/Homepage';

const AppContainer = styled(Box)({
  backgroundColor: "#FBF9F9",
  height: "100%",
  width: "100%",
  color: "black", 
  display: "flex", 
  flexDirection: "column"
});

const AppContent = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
});

function App() {

  const description: string = `Bet and Play with your friends ! \n
  BetRubgy is an easy game where you can bet on rugby matches in various competitions.
  Create or Join a league to beat your friend and to know which of you are the best rugby fan ! \n
  FanMade game, give us some love and support ! Share is appreciated \n
  BetRugby team <3 `;

  return (
    <AppContainer>
      <Menu/>
      <Router>
        <AppContent>
          <Routes>
            <Route path="/" element={
              <>
                <Box sx={{width: "50%", textAlign: "center", whiteSpace: "pre-line"}}> {description} </Box>
                <Login/>
              </>
            }/>
            <Route path="/home" element={<Homepage/>}/>
          </Routes>
        </AppContent>
      </Router>
    </AppContainer>
  );
}

export default App;
