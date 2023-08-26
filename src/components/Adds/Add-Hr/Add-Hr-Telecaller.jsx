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

const AddTelecaller = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [gymService, setGymService] = useState("");
    const [review, setReview] = useState("");
    const [allServices, setAllServices] = useState("");

    const getGymService = async () => {
        let res = await axios.get(
          "http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/getAllGymService"
        );
    
        console.log("responce=============->", res.data.data);
    
        const modifiedData = res.data.data.reduce(
          (prev, current) => [
            ...prev,
            {
              ...current,
              id: current._id
            },
          ],
          []
        );
        setAllServices(modifiedData);
      };

      useEffect(() => {
        getGymService()
      }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log("name =>", name)
        console.log("mobile =>", mobile)
        console.log("review =>", review)
        console.log("gymService =>", gymService)
        var data = new FormData();
        data.append("name", name);
        data.append("mobile", mobile);
        data.append("review",review);
        data.append("service",gymService);  
        let config = {
        method: 'post',
        url: 'http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/hr/telecaller/submit',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")
            navigate('/hr/telecaller')
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
                        Add Hr Telecaller Record
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
                                    label="Name"
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="mobile"
                                    {...register("mobile", { required: false })}
                                    name="mobile"
                                    fullWidth
                                    id="mobile"
                                    label="Mobile"
                                    autoFocus
                                    value={mobile}
                                    onChange={(e)=> setMobile(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="review"
                                    label="review"
                                    required
                                    value={review}
                                    onChange={(e)=>setReview(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    {...register("service", { required: true })}
                                    id="gymService"
                                    className="form-select"
                                    value={gymService}
                                    onChange={(e) => {
                                    setGymService(e.target.value);
                                    }}
                                >
                                    <option value={""} disabled>
                                    Choose Service
                                    </option>

                                    {allServices.length &&
                                    allServices?.map((x, key) => {
                                        return (
                                        <option key={key} value={x.id}>
                                            {x.title}
                                        </option>
                                        );
                                    })}
                                </select>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Telecaller
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/hr/telecaller" variant="body2">
                                        Back to allTelecaller Records
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

export default AddTelecaller;