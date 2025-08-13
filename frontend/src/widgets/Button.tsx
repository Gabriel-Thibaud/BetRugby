import { styled, Button as MuiButton, ButtonProps } from "@mui/material";

const CustomButton = styled(MuiButton)({
    borderRadius: "10px",
    fontWeight: "bold",
});

export function Button(props: ButtonProps) {
    return (
        <CustomButton {...props}>
            {props.children}
        </CustomButton>
    );
}
