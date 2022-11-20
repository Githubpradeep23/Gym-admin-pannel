import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";



import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const theme = createTheme();
const AddCoupan = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    let navigate = useNavigate();


    const [title, settitle] = useState("");
    const [copuanCode, setCopuanCode] = useState("");
    const [discountpercentage, setDiscountpercentage] = useState("");
    const [expireAt, setExpireAt] = useState(null);



    const onSubmit = async (data) => {

        var data = JSON.stringify({
            "copuanCode": copuanCode,
            "copuanTitle": title,
            "discount_percentage": discountpercentage,
            "expireAt": expireAt

        });

        var config = {
            method: 'post',
            url: 'https://gymapibackend.herokuapp.com/api/v1/addCopuan',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.alert("success")
                navigate('/coupan');

            })
            .catch(function (error) {
                window.alert("error")
                console.log(error);
            });
    };


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
                            Add Coupan
                        </Typography>

                        <Box

                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="title"
                                        fullWidth
                                        id="title"
                                        label="Coupan Title"
                                        autoFocus
                                        required
                                        onChange={(e) => settitle(e.target.value)}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="discountpercentage"
                                        fullWidth
                                        id="discountpercentage"
                                        label="Discount Precentage"
                                        autoFocus
                                        required
                                        onChange={(e) => setDiscountpercentage(e.target.value)}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="copuanCode"
                                        fullWidth
                                        id="copuanCode"
                                        label="Coupan Code"
                                        autoFocus
                                        required
                                        onChange={(e) => setCopuanCode(e.target.value)}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="date"
                                        autoComplete="given-name"
                                        name="expireAt"
                                        fullWidth
                                        id="expireAt"
                                        label="Expired At"
                                        autoFocus
                                        required
                                        onChange={(e) => setExpireAt(e.target.value)}
                                    />

                                </Grid>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // onClick={handleSubmit}

                                >
                                    Add Coupan
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/coupan" variant="body2">
                                            Back to coupans
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

export default AddCoupan;