import { Box, Drawer, IconButton, styled } from '@mui/material';
import { userDataSource } from '../datasources/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { darkBlue, gold, white } from '../utils/colors';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

const MenuContainer =  styled(Box)({
    height: "55px",    
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    backgroundColor: darkBlue
});

const Logo = styled("img")({
    position: "relative",
    left: "-25px",
    height: "150px",
    paddingTop: "8px"
});

const MenuButton = styled(IconButton)({
    backgroundColor: white,
    ":hover": {
        backgroundColor: white
    }
});

const MenuLogo = styled("img")({
    width: "150px",
    paddingTop: "8px",
    alignSelf: "center"
});

const OptionsContainer = styled(Box)({
    display: "flex", 
    flexDirection: "column",
    flex: 1,
    paddingTop: "25px"
});

const MenuOption = styled(Box)({
    display: "flex",
    color: darkBlue,
    fontSize: "20px",
    padding: "10px",
    ":hover": {
        cursor: "pointer",
    }
});

const SignOutContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: "3px",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px",
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

    const [openDrawer, setOpenDrawer] = useState(false);

    async function toHomePage() {
        navigate("/home");
        setOpenDrawer(false);
    }

    async function toBetAndResultPage() {
        navigate("/bets");
        setOpenDrawer(false);
    }
    
    async function signOut() {
        const logoutStatus: { error: string } = await userDataSource.logout();
        if (logoutStatus.error)
            alert("Error during the sign out");
        else {
            navigate("/");
            setOpenDrawer(false);
        }
    }

    return (
        <MenuContainer>
            <Logo src="./logo.svg" alt="BetRugby logo"/>
            {location.pathname !== "/" && 
                <>
                    <MenuButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </MenuButton>
                    <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                        <Box sx={{ width: 250, height:"100%", display: "flex", flexDirection: "column"}}>
                            <MenuLogo src="./dark_logo.png" alt="BetRugby logo"/>
                            <OptionsContainer>
                                <MenuOption onClick={() => toHomePage()}>
                                    <HomeIcon/>
                                    <Box>Home</Box> 
                                </MenuOption>
                                <MenuOption onClick={() => toBetAndResultPage()}>
                                    <SportsRugbyIcon/>
                                    <Box>Bets and Results</Box> 
                                </MenuOption>
                            </OptionsContainer>
                            <SignOutContainer onClick={() =>signOut()}>
                                <Box onClick={() => signOut()}> Sign out </Box>
                                <LogoutIcon/>                            
                            </SignOutContainer>
                        </Box>
                    </Drawer>
            </>
            }
        </MenuContainer>
    );
}