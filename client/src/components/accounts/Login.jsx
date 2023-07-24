import React, { useState } from "react"
import { Box, TextField, Button, Typography, styled } from "@mui/material"
import { API } from '../../service/api'
import { useContext } from "react"
import { DataContext } from "../../context/DataProvider"
import { useNavigate } from "react-router-dom"

const Component = styled(Box)`
	width: 400px;
	margin: auto;
	box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  margin-top:90px;
`

const Image = styled("img")({
    width: 100,
    display: "flex",
    margin: "auto",
    padding: "50px 0 0",
})

const WrapperBox = styled(Box)`
	padding: 25px 35px;
	display: flex;
	flex-direction: column;
	& > div,
	& > button {
		margin-top: 20px;
	}
	& > p {
		margin: 1px 0 0;
	}
`

const LoginButton = styled(Button)`
	text-transform: none;
	background: #ff7400;
	height: 48px;
	border-radius: 2px;
`

const SignupButton = styled(Button)`
	text-transform: none;
	background: #fff;
	color: #2874f0;
	height: 48px;
	border-radius: 2px;
	box-shadow: 0 2px 5px 0 #ed6e04;
`

const Text = styled(Typography)`
	color: #878787;
	font-size: 10px;
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

function Login({setIsAuthenticated}) {

    // crreating the navigation router
    const navigate = useNavigate();

    // todo usecontext pull values
    const { setAccount } = useContext(DataContext)

    const ImageUrl = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"
    // * to store sign in and singup changes.
    const [sign, setSign] = useState("Signin")
    const [error, setError] = useState('');
    //* creating a Signup Object which Sotres name username and password
    const signupInitialValues = {
        name: '',
        username: '',
        password: '',
    };
    const [signup, setSignup] = useState(signupInitialValues)


    //*creating a sign in object having username and password.
    const LoginInitialValues = { username: '', password: '' };

    const [login, setLogin] = useState(LoginInitialValues);

    //* To change sign in to signup vioceversa.
    const HandleSigninAndSignup = () => {
        if (sign === 'SignUp') {
            setSign('Signin');
        }
        else {
            setSign('SignUp');
        }
    }

    //*Handling change in sign up or registeration.
    const HandleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    //*Handling the change in sign in fields

    const HandleLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    //*Hadling the addign of new user
    const signupUser = async () => {
        let response = await API.userSignup(signup)
        if (response.isSuccess) {
            // console.log("The response is sucess");
            setError('');
            setSignup(signupInitialValues);
            setSign('Signin');
        }
        else {
            setError('Something went wrong! please try again later');
        }
    }

    //*signin the user.
    const loginUser = async () => {
        // console.log(login);
        let response = await API.userLogin(login)
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ username: response.data.username, name: response.data.name });
            setIsAuthenticated(true);
            navigate('/')
        }
        else {
            setError('Something went wrong! please try again later');
        }

    }

    return (
        <Component>
            <Box>
                <Image src={ImageUrl} alt="logo" srcset="" />
                {sign === "Signin" ? (
                    <WrapperBox>
                        <TextField variant="outlined" value={login.username} label="Enter username" name='username' onChange={(e) => HandleLoginChange(e)} />
                        <TextField variant="outlined" value={login.password} label="Enter Password" name="password" onChange={(e) => { HandleLoginChange(e) }} />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{ textAlign: "center" }}>OR</Text>
                        <SignupButton variant="text" onClick={() => HandleSigninAndSignup()}>
                            Create Account
                        </SignupButton>
                    </WrapperBox>
                ) : (
                    <WrapperBox>
                        <TextField variant="outlined" onChange={(e) => HandleChange(e)} label="Enter Name" name="name" />
                        <TextField variant="outlined" onChange={(e) => HandleChange(e)} label="Enter username" name="username" />
                        <TextField variant="outlined" onChange={(e) => HandleChange(e)} label="Enter Password" name="password" />

                        
                        <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                        <Text style={{ textAlign: "center" }}>OR</Text>
                        <LoginButton variant="contained" onClick={HandleSigninAndSignup}>Sign in to account</LoginButton>
                    </WrapperBox>
                )}
            </Box>
        </Component>
    )
}

export default Login
