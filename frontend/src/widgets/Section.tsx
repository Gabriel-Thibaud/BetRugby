import { styled, BoxProps, Box } from "@mui/material";
import { blue, white } from "../utils/colors";

const CustomSection = styled(Box)({
    border: `2px solid ${blue}`,
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: white
});

export function Section(props: BoxProps) {
    return (
        <CustomSection {...props}>
            {props.children}
        </CustomSection>
    );
}
