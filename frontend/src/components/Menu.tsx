import { Box, styled } from '@mui/material';
import { userDataSource } from '../datasources/index';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { darkBlue, gold, white } from '../utils/colors';

const MenuContainer =  styled(Box)({
    height: "55px",    
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    backgroundColor: darkBlue
});

const MenuContent = styled(Box)({
    width:"100%",
    display: "flex",
    justifyContent: "space-between",
    color: white,
});

const OptionsContainer = styled(Box)({
    width: "85%",
    display: "flex",
    justifyContent: "center",
    gap: "150px",
    fontSize: "22px"
});

const SignOutContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: "3px",
    cursor: "pointer",
    fontSize: "18px",
    ":hover": {
        color: gold
    },
    "svg":  {
        paddingTop: "2px"
    }
});

export function Menu() {

    const location = useLocation();
    const navigate = useNavigate();
    
    async function signOut() {
        const logoutStatus: { error: string } = await userDataSource.logout();
        if (logoutStatus.error)
            alert("Error during the sign out");
        else
            navigate("/");
    }

    return (
        <MenuContainer>
            <Box sx={{fontSize: "35px", color: white, fontFamily: 'Barlow Condensed, sans-serif'}}> BetRugby </Box>
            {location.pathname !== "/" && 
                <MenuContent>
                    <OptionsContainer>
                        <Box> Home </Box>
                        <Box> Rules </Box>
                    </OptionsContainer>
                    <SignOutContainer onClick={() =>signOut()}>
                        <Box onClick={() =>signOut()}> Sign out </Box>
                        <LogoutIcon/>
                    </SignOutContainer>
                </MenuContent>
            }
        </MenuContainer>
    );
}