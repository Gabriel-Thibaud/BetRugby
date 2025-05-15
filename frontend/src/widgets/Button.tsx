import { styled, Button as MuiButton, ButtonProps } from "@mui/material";

const CustomButton = styled(MuiButton)({
    boxShadow: "0px 3px #D9D9D9",
    borderRadius: "10px",
    fontWeight: "bold",
    "&:hover":{
        boxShadow: "none"
    }
});

export function Button(props: ButtonProps) {
    return (
        <CustomButton {...props}>
            {props.children}
        </CustomButton>
    );
}
