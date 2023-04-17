import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const theme = createTheme();

const AddExercise = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [bodyPart, setBodyPart] = useState("");

    const onSubmit = async (data) => {
        event.preventDefault();
        console.log(onSubmit);
        console.log("name =>", name)
        console.log("type =>", type)
        console.log("bodyPart =>", bodyPart)
        var data = new FormData();
        data.append("name", name);
        data.append("type",type);
        data.append("bodyPart",bodyPart);  
        let config = {
        method: 'post',
        url: 'http://localhost:8080/api/v1/trainer/exercise/submit',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/trainer/exercise')
        })
        .catch(function (error) {
            console.log(error);
            window.alert("fail")
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Leave Type
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    {...register("name", { required: true })}
                                    name="name"
                                    fullWidth
                                    id="name"
                                    label="Exercise Name"
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="type"
                                    {...register("type", { required: false })}
                                    name="type"
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    autoFocus
                                    value={type}
                                    onChange={(e)=> setType(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="bodyPart"
                                    label="Body Part"
                                    required
                                    value={bodyPart}
                                    onChange={(e)=>setBodyPart(e.target.value)}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Exercise
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/trainer/exercise" variant="body2">
                                        Back to all Exercise
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </form>
    );
};

export default AddExercise;