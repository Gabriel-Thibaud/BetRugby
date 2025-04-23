import React, { useEffect, useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';

const LoginContainer =  styled(Box)({
    width: "40%",
    height: "fit-content",
    display: "flex", 
    flexDirection: "column",
    alignContent: "center",
    border: "2px solid #5D737E", 
    boxShadow: "4px 8px #5D737E",
    padding: "15px"
});

const FormContainer = styled(Box)({
    height: "fit-content",
    width: "100%",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    gap: "10px" 
});

const LoginButton = styled(Button)((props: {is_disabled: number}) => ({
    color: "white",
    backgroundColor: "#158030",
    opacity: props.is_disabled ? 0.5 : 1,
    cursor: props.is_disabled ? "not-allowed" : "pointer"
}));

export function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [isLoginView, setIsLoginView] = useState<boolean> (true);

    useEffect(() => {
        // if email OR password is missing -> login in not enabled
        if (!email || !password){
            setIsEnabled(false);
            return;
        }
           
        console.log("Login enabled - email and password set !")
        setIsEnabled(true);
        
    }, [email, password]);


    function login(): void {
        // if login is NOT enabled -> early return (quit the function)
        if (!isEnabled)
            return;
        
        console.log("Call to login !")
        // TODO: call to the backend to verify credentials
    }

    return (
        <LoginContainer>
            {isLoginView ?
                <>
                <Box sx={{fontSize: "24px", fontWeight: "bold"}}> Login </Box>
                <FormContainer>
                    <TextField 
                        sx={{width: "200px"}}
                        label="Email" 
                        variant="outlined"
                        value={email} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value.trim())}
                    /> 
                    <TextField 
                        sx={{width: "200px"}} 
                        label="Password" 
                        variant="outlined"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim())}
                    /> 
                    <LoginButton is_disabled={Number(!isEnabled)} onClick={() => login()}>
                        Login 
                    </LoginButton>
                    <Button 
                        sx={{fontSize: "14px"}} 
                        variant="outlined"
                        onClick={() => setIsLoginView(false)}
                    > 
                        Create an account 
                    </Button>
               
                </FormContainer>
                </>
            :
                <>
                <Box sx={{fontSize: "24px", fontWeight: "bold"}}> Create an account </Box>
                </>
            } 
            
        </LoginContainer>
    );
}