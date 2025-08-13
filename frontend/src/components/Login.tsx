import React, { useEffect, useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';
import { userDataSource } from '../datasources/index';
import { useNavigate } from 'react-router-dom';
import { blue, gold, green, white, red } from '../utils/colors';

const LoginContainer =  styled(Box)({
    width: "40%",
    height: "fit-content",
    display: "flex", 
    flexDirection: "column",
    alignContent: "center",
    border: `2px solid ${blue}`,
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: white
});

const FormContainer = styled(Box)({
    height: "fit-content",
    width: "100%",
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "5px"
});

const LoginButton = styled(Button)((props: {is_disabled: number}) => ({
    color: white,
    backgroundColor: green,
    opacity: props.is_disabled ? 0.5 : 1,
    cursor: props.is_disabled ? "not-allowed" : "pointer"
}));

const SwitchViewButton = styled(Box)({
    fontSize: "14px",
    fontWeight: "bold",
    opacity: 0.6,
    ":hover": {
        cursor: "pointer", 
        color: gold,
        opacity: 1
    }
});

export function Login() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [isLoginView, setIsLoginView] = useState<boolean> (true);
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => {
        if (!isFormValid()) {
            setIsEnabled(false);
            return;
        }  
        setIsEnabled(true);
    }, [email, password, confirmedPassword, username]);

    async function handleFormSummit() {
        if (!isFormValid())
            return;

        if (isLoginView) {
            const loginStatus: { error: string } = await userDataSource.login(email, password);
            if (loginStatus.error){
                setErrorMessage(loginStatus.error);
                return;
            }
        } else  {
            const signUpStatus: { error: string }  = await userDataSource.signUp(email, password, username.trim());
            if (signUpStatus.error) {
                setErrorMessage(signUpStatus.error);
                return;
            }
        }
        navigate("/home");
    }

    function isFormValid(): boolean {
        if (isLoginView)
            return !!email && !!password;

        return password === confirmedPassword && !!username.trim() && !!email && !!password;
    }

    function onSwitchView(){
        setErrorMessage(""); 
        setIsLoginView(prev => !prev); // previous state is "reversed" 
    }

    return (
        <LoginContainer>
            <Box sx={{fontSize: "24px", fontWeight: "bold"}}> {isLoginView ? "Login":"Create an account"} </Box>
            <FormContainer>
                {!isLoginView &&
                    <TextField 
                        sx={{width: "200px"}}
                        label="Username" 
                        variant="outlined"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    /> 
                }
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
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim())}
                /> 
                {!isLoginView &&
                    <TextField 
                        sx={{width: "200px"}} 
                        label="Confirm password" 
                        variant="outlined"
                        type="password"
                        value={confirmedPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value.trim())}
                    />
                }
                {errorMessage &&
                    <Box sx={{color: red, fontSize: "12px"}}> {errorMessage} </Box>
                }
                <LoginButton is_disabled={Number(!isEnabled)} onClick={() => handleFormSummit()}>
                      {isLoginView ? "Login" : "Create"} 
                </LoginButton>
                <SwitchViewButton onClick={() => onSwitchView()}>
                    {isLoginView ? "Create an account" : "Sign in"}
                </SwitchViewButton>
            </FormContainer>
        </LoginContainer>
    );
}