import * as React from "react";
import "./login.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";


const theme = createTheme();

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]= useState(false)


  const onSubmit = async (data) => {
    console.log("data=> ", data)
    // event.preventDefault();
    console.log("Login submit click");
    var data = JSON.stringify({
      "email": email,
      "password": password
    });
    
    var config = {
      method: 'post',
      // https://candidateapp.herokuapp.com/ old live domain url
      url: 'http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/adminLogin',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      window.alert("Login success")
      navigate('home');

    })
    .catch(function (error) {
      console.log("login wala error => ",error);
      window.alert("Login Fail")
      
    });
    // const userLogin = await axios.post("http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/adminLogin", {
    //   email,
    //   password,
    // }
    
    // )
    // console.log("login wala kaam",userLogin)
    // if(userLogin.status === 200){
    //   window.alert("Login Success")
    //   navigate('home');
    //   // <Alert severity="success">This is a success alert — check it out!</Alert>


    // }
    // else{
    //   window.alert("Login Error")

    //         // <Alert severity="error">This is an error alert — check it out!</Alert>
    // }
    // console.log(
    //   "🚀 ~ file: Login.jsx ~ line 31 ~ handleSubmit ~ userLogin",
    //   userLogin
    // );
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)}>

     <ThemeProvider theme={theme}>
       <Container component="main"
        maxWidth="xs"
        >
         <CssBaseline />
         <Box 
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
             alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
           <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          
         
          <Box  sx={{ mt: 1 }}>
            <TextField
               {...register("email", { required: true })} 
              value={email}
              margin="normal"
              
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              required
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
      {/* {errors.email && <p style={{color:"red"}}>email is required</p>} */}

            <TextField
                           {...register("password", { required: true })} 

              value={password}
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
      {/* {errors.password && <p style={{color:"red"}}>Password is required</p>} */}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleSubmit}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
</form>
   );
 };

 export default Login;

{/* import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName?.type === 'required' && "First name is required"}
      
      <input {...register("lastName", { required: true })} />
      {errors.lastName && <p>Last name is required</p>}

      <input {...register("mail", { required: "Email Address is required" })} />
      <p>{errors.mail?.message}</p>
      
      <input type="submit" />
    </form>
  );
} */}