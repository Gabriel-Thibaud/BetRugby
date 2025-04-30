import { Box, styled } from '@mui/material';
import { Homepage } from './components/homepage/Homepage';

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

  return (
    <AppContainer>
      <AppContent>
        <Homepage/>
      </AppContent>
    </AppContainer>
  );
}

export default App;