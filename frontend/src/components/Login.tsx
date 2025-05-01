import React, { useEffect, useState } from 'react';
import { Box, Button, styled, TextField } from '@mui/material';
import { userDataSource } from '../datasources/index';
import { useNavigate } from 'react-router-dom';

const LoginContainer =  styled(Box)({
    width: "40%",
    height: "fit-content",
    display: "flex", 
    flexDirection: "column",
    alignContent: "center",
    border: "2px solid #5D737E",
    borderRadius: "10px",
    boxShadow: "4px 6px #5D737E",
    padding: "15px"
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
    color: "white",
    backgroundColor: "#158030",
    opacity: props.is_disabled ? 0.5 : 1,
    cursor: props.is_disabled ? "not-allowed" : "pointer"
}));

const SwitchViewButton = styled(Box)({
    fontSize: "14px",
    fontWeight: "bold",
    opacity: 0.6,
    ":hover":{
        cursor: "pointer", 
        color: "#158030",
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
        console.log("Login enabled - email and password set !")
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
            const signUpStatus: { error: string }  = await userDataSource.signUp(email, password, username);
            if (signUpStatus.error){
                setErrorMessage(signUpStatus.error);
                return;
            }
            console.log("signUpStatus" , signUpStatus);
        }

        navigate("/home");
    }

    function isFormValid(): boolean {
        if (isLoginView)
            return !!email && !!password;

        return password === confirmedPassword && !!username && !!email && !!password;
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value.trim())}
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
                    <Box sx={{color: "#CB1111", fontSize: "12px"}}> {errorMessage} </Box>
                }
          
                <LoginButton is_disabled={Number(!isEnabled)} onClick={() => handleFormSummit()}>
                      {isLoginView ? "Login" : "Create"} 
                </LoginButton>
                <SwitchViewButton onClick={() => setIsLoginView(prev => !prev)}> {/* previous state is "reversed"  */}
                    {isLoginView ? "Create an account" : "Sign in"}
                </SwitchViewButton>
            
            </FormContainer>
        </LoginContainer>
    );
}