import { Box, styled } from "@mui/material";
import { createRef, CSSProperties } from "react"
import ReactDOM from "react-dom"
import { darkBlue, lightBlue, overlay } from "../utils/colors";

const Wrapper = styled(Box)((props: {zIndex: number}) => ({
    height: "100%",
    width:  "100%",
    position: "fixed",
    top:0,
    right:0,
    zIndex: props.zIndex ? props.zIndex : "999",
    backgroundColor: overlay,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const Inner = styled(Box)({
    backgroundColor: lightBlue,
    borderRadius: "24px",
    padding: "24px",
    boxSizing: "border-box",
    color: darkBlue,
    display:"flex",
    flexDirection: "column",
    boxShadow:" rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
    
});

export const appDialogRef: React.RefObject<HTMLDivElement | null> = createRef<HTMLDivElement>();

interface DialogProps {
    zIndex?: number
    onClose: () => void
    onEnter?: () => void
    closeOnClickOutside?: boolean
    style?: CSSProperties
    children: React.ReactNode
}

export function Dialog(props: DialogProps) {

    const dialogRef = createRef<HTMLDivElement>();

    function handleWrapperClick(e: React.MouseEvent<HTMLDivElement>){

        // verify that the click is outside (e.target not in dialogRef)
        if (props.closeOnClickOutside && !dialogRef.current?.contains(e.target as Node)){
            e.stopPropagation();
            props.onClose()
        }
    }
    
    if (!appDialogRef.current)
        return null;
    
    return (
        ReactDOM.createPortal(
            <Wrapper
                zIndex={props.zIndex ?? 999}
                style={{...props.style}}
                onClick={(e) => handleWrapperClick(e)}
            >
                <Inner ref={dialogRef}>
                    <div> {props.children} </div>
                </Inner>
            </Wrapper>,
            appDialogRef.current
        )
    );
}