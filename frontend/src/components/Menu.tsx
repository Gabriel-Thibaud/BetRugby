import { Box, styled } from '@mui/material';

const MenuContainer =  styled(Box)({
    height: "35px",    
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #5D737E", 
    padding: "5px",
    fontSize: "20px"
});

const OptionsContainer = styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px", 
});

export function Menu() {

    return (
        <MenuContainer>
            <Box sx={{fontSize: "30px", color: "#E5B226"}}> BetRugby </Box>
            <OptionsContainer>
                <Box> Home </Box>
                <Box> Rules </Box>
                <Box> Option3 </Box>
            </OptionsContainer>
        </MenuContainer>
    );
}