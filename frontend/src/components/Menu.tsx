import { Box, styled } from '@mui/material';
import { userDataSource } from '../datasources/index';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const MenuContainer =  styled(Box)({
    height: "35px",    
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #5D737E", 
    padding: "5px"
});

const MenuContent = styled(Box)({
    width:"100%",
    display: "flex",
    justifyContent: "space-between"
});

const OptionsContainer = styled(Box)({
    width: "85%",
    display: "flex",
    justifyContent: "center",
    gap: "150px", 
    color: "#E5B226",
    fontSize: "25px"
});

const SignOutContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: "3px",
    cursor: "pointer",
    color: "#D9D9D9",
    fontSize: "20px",
    ":hover": {
        color: "#E5B226"
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
            <Box sx={{fontSize: "35px", color: "#E5B226"}}> BetRugby </Box>
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