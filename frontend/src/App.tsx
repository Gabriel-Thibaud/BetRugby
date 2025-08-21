import { Box, styled } from '@mui/material';
import { Menu } from './components/Menu';
import { Login } from './components/Login';
import { Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { Homepage } from './components/Homepage';
import { darkBlue, lightBlue } from './utils/colors';
import ProtectedRoute from './components/ProtectedRoute';

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
  width: "100%",
  display: "flex", 
  justifyContent: "space-around",
  alignItems:"center", 
  flexWrap: "wrap",
  gap: "20px",
  padding: "10px"
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
                <Box sx={{width: "50%", textAlign: "center", whiteSpace: "pre-line"}}> {description} </Box>
                <Login/>
              </LoginPageContainer>
            }/>
            <Route path="/home" element={<ProtectedRoute><Homepage/></ProtectedRoute>}/>
          </Routes>
        </AppContent>
      </AppContainer>
     </Router>
  );
}

export default App;