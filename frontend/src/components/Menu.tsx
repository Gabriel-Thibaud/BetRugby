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

const SignOutContainer = styled(Box)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: "3px",
    cursor: "pointer",
    fontSize: "18px",
    color: white,
    ":hover": {
        color: gold
    },
    "svg":  {
        paddingTop: "2px"
    }
});

const Logo = styled("img")({
    height: "150px",
    paddingTop: "8px"
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
            <Logo src="./logo.svg" alt="BetRugby logo"/>
            {location.pathname !== "/" && 
                <SignOutContainer onClick={() =>signOut()}>
                    <Box onClick={() => signOut()}> Sign out </Box>
                    <LogoutIcon/>
                </SignOutContainer>
            }
        </MenuContainer>
    );
}