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
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';



import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const theme = createTheme();
const AddGymBranch = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const [opening_branchTiming, setopening_branchTiming] = useState(dayjs())
    // const [closing_branchTiming, setclosing_branchTiming] = useState(dayjs())

    // const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

    // const open = (newValue) => {
    //     setopening_branchTiming(newValue);
    // };
    // const close = (newValue) => {
    //     setclosing_branchTiming(newValue);
    // };
    let navigate = useNavigate();

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [branchCode, setbranchCode] = useState("");
    const [branchTiming, setbranchTiming] = useState("");
    const [location, setlocation] = useState("");
    const [managerName, setmanagerName] = useState("");
    const [manager_Phone_Number, setmanager_Phone_Number] = useState("");
    const [Image, setimage] = useState("");



    const onSubmit = async (data) => {
        // event.preventDefault();
        console.log("Login submit click");
        console.log("User =>", name)
        console.log("address =>", address)
        console.log("phoneNumber =>", phoneNumber)
        console.log("city =>", city)
        console.log("branchCode =>", branchCode)
        console.log("branchTiming =>", branchTiming)
        console.log("location =>", location)
        console.log("image-->", Image);
        var data = new FormData();
        data.append('name', name);
        data.append('address', address);
        data.append('city', city);
        data.append('phoneNumber', phoneNumber);
        data.append('branchCode', branchCode);
        data.append('location', location);
        data.append('managerName', managerName);
        data.append('manager_Phone_Number', manager_Phone_Number);
        let image = typeof Image === 'string' || Image instanceof String ? null : Image;
        data.append('image', image);
        var config = {
            method: 'post',
            url: 'http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/addGymBranch',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.alert("success")
                navigate('/Gym-list')
            })
            .catch(function (error) {
                window.alert("error")
                console.log(error);
            });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
                  console.log("Latitude is :", position.coords.latitude);
                  console.log("Longitude is :", position.coords.longitude);
                });
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
          });
    }, [])

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
                            Add Gym branch
                        </Typography>

                        <Box

                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        {...register("name", { required: true })}

                                        fullWidth
                                        id="name"
                                        label="Branch Name"
                                        autoFocus
                                        value={name}
                                        required
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                    {/* {errors.name && <p st/>yle={{ color: "red" }}> Name is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register("address", { required: true })}

                                        fullWidth
                                        id="address"
                                        label="Address "
                                        name="address"
                                        autoComplete="address"
                                        required
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}

                                    />
                                    {/* {errors.address && <p style={{ color: "red" }}> address is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        autoComplete="city"
                                        name="city"
                                        {...register("city", { required: true })}

                                        fullWidth
                                        id="city"
                                        label="City"
                                        autoFocus
                                        value={city}
                                        required
                                        onChange={(e) => setcity(e.target.value)}
                                    />
                                    {/* {errors.city && <p style={{ color: "red" }}> city is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputProps={{
                                            inputMode: 'numeric', pattern: '[0-9]*',
                                            maxLength: 10,
                                            minLength: 10,
                                        }}

                                        autoComplete="phoneNumber"
                                        name="phoneNumber"
                                        {...register("phoneNumber", { required: true })}

                                        fullWidth
                                        id="phoneNumber"
                                        label="GYM Phone Number"
                                        autoFocus
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setphoneNumber(e.target.value)}
                                    />
                                    {/* {errors.phoneNumber && <p style={{/ color: "red" }}> phoneNumber is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="branchCode"
                                        name="branchCode"
                                        {...register("branchCode", { required: true })}

                                        fullWidth
                                        id="branchCode"
                                        label="Branch Code"
                                        autoFocus
                                        required
                                        value={branchCode}
                                        onChange={(e) => setbranchCode(e.target.value)}
                                    />
                                    {/* {errors.branchCode && <p style={{ color: "red" }}> branchCode is required</p>} */}

                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>

                                        <TimePicker
                                            label="Open Timing"
                                            value={opening_branchTiming}
                                            onChange={open}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </Stack>
                                </LocalizationProvider>
                                </Grid> */}
                                {/* <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>

                                        <TimePicker
                                            label="Close Timing"
                                            value={closing_branchTiming}
                                            onChange={close}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </Stack>
                                </LocalizationProvider>
                             
                            </Grid> */}
                                {/* <Grid item xs={12} sm={6}>
                                    <TextField

                                        autoComplete="branchTiming"
                                        name="branchTiming"
                                        {...register("branchTiming", { required: true })}

                                        fullWidth
                                        id="branchTiming"
                                        label="branch timing"
                                        autoFocus
                                        value={branchTiming}
                                        onChange={(e) => setbranchTiming(e.target.value)}
                                    />
                                    {errors.branchTiming && <p style={{ color: "red" }}> branchTiming is required</p>}

                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        autoComplete="location"
                                        name="location"
                                        {...register("location", { required: true })}

                                        fullWidth
                                        id="location"
                                        label="Location"
                                        autoFocus
                                        value={location}
                                        required
                                        onChange={(e) => setlocation(e.target.value)}
                                    />
                                    {/* {errors.location && <p style={{ color: "red" }}> location is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        autoComplete="managerName"
                                        name="managerName"
                                        {...register("managerName", { required: true })}

                                        fullWidth
                                        id="managerName"
                                        label="Manager Name"
                                        autoFocus
                                        required
                                        value={managerName}
                                        onChange={(e) => setmanagerName(e.target.value)}
                                    />
                                    {/* {errors.managerName && <p style={{ color: "red" }}> managerName is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputProps={{
                                            inputMode: 'numeric', pattern: '[0-9]*',
                                            maxLength: 10,
                                            minLength: 10,
                                        }}
                                        autoComplete="manager_Phone_Number"
                                        name="manager_Phone_Number"
                                        {...register("manager_Phone_Number", { required: true })}

                                        fullWidth
                                        id="manager_Phone_Number"
                                        label="Manager Phone Number"
                                        autoFocus
                                        required
                                        value={manager_Phone_Number}
                                        onChange={(e) => setmanager_Phone_Number(e.target.value)}
                                    />
                                    {/* {errors.manager_Phone_Number && <p style={{ color: "red" }}> manager_Phone_Number is required</p>} */}

                                </Grid>
                                <Grid item xs={12} sm={6} mt={3}>
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input
                                        hidden
                                        accept="image/*"
                                        {...register("image", { required: false })}
                                        multiple
                                        type="file"
                                        //  value={image}
                                        onChange={(e) => setimage(e.target.files[0])}
                                        />
                                    </Button>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                // onClick={handleSubmit}

                                >
                                    Add Gym branch
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/Gym-list" variant="body2">
                                            Back to gym branch
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

export default AddGymBranch;
