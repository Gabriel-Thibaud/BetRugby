import { Box, styled } from "@mui/material";
import { Dialog } from "../../widgets/Dialog";
import { Button } from "../../widgets/Button";
import { darkBlue, red, white } from "../../utils/colors";

const WarningContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px"
});

const CustomButton = styled(Button)((props: {bg_color: string}) =>({
    backgroundColor: props.bg_color,
    color: white
}));

interface AllLeaguesWarningProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export function AllLeaguesWarning(props: AllLeaguesWarningProps) {

    const warningMessage: string = `By checking this box, every bet you place will be applied to all your 
                                    leagues and will rewrite that bet if it has already been placed. `;

    return (
        <Dialog onClose={() => props.onCancel()} closeOnClickOutside>
            <WarningContainer>
                <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    <Box sx={{fontSize: "20px", fontWeight: "bold", color: red}}> Warning </Box>
                    <Box> {warningMessage} </Box>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button sx={{color: darkBlue}} onClick={() => props.onCancel()}> Cancel </Button>
                    <CustomButton bg_color={darkBlue} onClick={() => props.onConfirm()}> Confirm </CustomButton>
                </Box>
            </WarningContainer>
        </Dialog>
    );
}