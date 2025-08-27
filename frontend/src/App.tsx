import { Box, styled } from '@mui/material';
import { Menu } from './components/Menu';
import { Login } from './components/Login';
import { Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { Homepage } from './components/Homepage';
import { darkBlue, lightBlue } from './utils/colors';
import ProtectedRoute from './components/ProtectedRoute';
import { Section } from './widgets/Section';
import { InstaLogo } from './utils/instagram_logo';
import { BetsAndResults } from './components/Bets/BetsAndResults';

const AppContainer = styled(Box)({
  backgroundColor: lightBlue,
  flex: 1,   
  width: "100%",
  color: darkBlue,
  display: "flex", 
  flexDirection: "column"
});

const AppContent = styled(Box)({
  flex: 1, 
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
});

const LoginPageContainer = styled(Box)({
  height: "fit-content",
  width: "100%",
  margin: "auto",
  display: "flex", 
  justifyContent: "space-around",
  alignItems:"stretch", 
  flexWrap: "wrap",
  gap: "20px",
  padding: "10px"
}); 

const DescriptionWrapper = styled(Section)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  whiteSpace: "pre-line"
});

function App() {

  const description: string = `Bet and Play with your friends ! \n
  BetRubgy is an easy game where you can bet on rugby matches in various competitions.
  Create or Join a league to beat your friend and to know which of you are the best rugby fan ! \n
  FanMade game, give us some love and support ! Share is appreciated \n
  BetRugby team <3 `;

  return (
    <Router>
      <AppContainer>
        <Menu/>
        <AppContent>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={
              <LoginPageContainer>
                <DescriptionWrapper>
                  <img src="./dark_logo.png" alt="BetRugby logo" height={50}/>
                  <Box>{description} </Box>
                  <a href="https://www.instagram.com/betrugby.app/"  target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstaLogo/>
                  </a>
                </DescriptionWrapper>
                <Login/>
              </LoginPageContainer>
            }/>
            <Route path="/home" element={<ProtectedRoute><Homepage/></ProtectedRoute>}/>
            <Route path="/bets" element={<ProtectedRoute><BetsAndResults/></ProtectedRoute>}/>
          </Routes>
        </AppContent>
      </AppContainer>
     </Router>
  );
}

export default App;