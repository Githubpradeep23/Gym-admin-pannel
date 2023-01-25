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
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';




import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const theme = createTheme();
const AddUser = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [time, setTime] = React.useState(dayjs('2014-08-18T21:11:54'));

    const DateChange = (newValue) => {
        setDate(newValue);
    };
    // const TimeChange = (newValue) => {
    //     setTime(newValue);
    // };
    let navigate = useNavigate();

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [gender, setgender] = useState("");
    const [DOB, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [coin, setCoin] = useState("");
    const [branch, setBranch] = useState("");
    const [Image, setImage] = useState();
    const [user_Address, setuser_Address] = useState("");




    const onSubmit = async (data) => {
        event.preventDefault();
        console.log(onSubmit);
         console.log("firstName =>", firstName)
         console.log("lastName =>", lastName)
         console.log("gender =>", gender)
         console.log("data =>", data)
         console.log("email =>", email)
         console.log("number =>", number)
         console.log("user_Address =>", user_Address)
         console.log("branch =>", branch)
         console.log("coin =>", coin)
      

        var data = new FormData();
        data.append("firstName", firstName);
        data.append( "lastName",lastName);
        data.append("gender",gender);
        data.append( "DOB" ,date);
        data.append("email", email);
        data.append("number",number);
        data.append("user_Address", user_Address);
        data.append("postal_code", branch);
        data.append("coin",parseInt(coin));
        data.append("image",Image);

        // var data = JSON.stringify({
        //     "firstName": firstName,
        //     "lastName":lastName,
        //     "gender":gender,
        //     "DOB" :date,
        //     "email": email,
        //     "number":number,
        //     "user_Address": user_Address,
        //     "postal_code": branch,
        //     "coin":parseInt(coin) ,

        //     "profilePicture":Image
        //   });
console.log()          
          var config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/addNewUser',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("success")

            navigate('/users')
          })
          .catch(function (error) {
            console.log(error);
            window.alert("fail")
          });
          

    }


    function ImageChange(e) {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
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
                        Add Users
                    </Typography>

                    <Box
                      
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
                                    {...register("firstName", { required: true })}

                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    required
                                    value={firstName}
                                    onChange={(e)=> setfirstName(e.target.value)}
                                />
                            {/* {errors.firstName && <p style={{ color: "red" }}>user name is required</p>} */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="lastName"
                                    {...register("lastName", { required: true })}

                                    name="lastName"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoFocus
                                    value={lastName}
                                    required
                                    onChange={(e)=> setlastName(e.target.value)}
                                />
                            {/* {errors.lastName && <p style={{ color: "red" }}>lastName is required</p>} */}
                            </Grid>
                             <Grid item xs={12} sm={6}>
                  <select
                    {...register("gender", { required: true })}
                    id="gender"
                    className="form-select"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value={""} disabled>
                      Choose gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  {errors.gender && (
                    <p style={{ color: "red" }}>gender is required</p>
                  )}
                </Grid>
                               
                            <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/DD/YYYY"
                                        required
                                        value={date}
                                        onChange={DateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                    
                                </Stack>
                            {/* {errors.DOB && <p style={{ color: "red" }}>DOB is required</p>} */}
                            </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // {...register("email", { required: true })}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    required
                                    // name="E-mail"
                                    // autoComplete="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}

                                />
                              {/* {errors.email && <p style={{ color: "red" }}>email is required</p>} */}

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 10,
                                    minLength: 10, }}
                                    // {...register("number", { required: true })}

                                    autoComplete="number"
                                    name="number"
                                    fullWidth
                                    id="number"
                                    label="Number"
                                    autoFocus
                                    value={number}
                                    required
                                    onChange={(e)=>setNumber(e.target.value)}
                                />
                             {/* {errors.number && <p style={{ color: "red" }}> Phone Number is required</p>} */}

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                                maxLength: 6,
                                minLength: 6,
                                                                       
                           }}
                                // {...register("postal_code", { required: true })}

                                // autoComplete="postal_code"
                                    fullWidth
                                    id="postal_code"
                                    label="Postal code"
                                    // name="Postal Code"
                                    autoFocus
                                    value={branch}
                                    required
                                    onChange={(e)=>setBranch(e.target.value)}

                                />
                                {/* {errors.postal_code && <p style={{ color: "red" }}> postal code is required</p>} */}

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        // {...register("user_Address", { required: true })}
                                        fullWidth
                                        id="user_Address"
                                        label="User_Address"
                                        name="user_Address"
                                        autoComplete="user_Address"
                                        required
                                        value={user_Address}
                                        onChange={(e)=>setuser_Address(e.target.value)}
                                    />
                                {/* {errors.user_Address && <p style={{ color: "red" }}>user_Address is required</p>} */}



                                </Grid> 
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        // {...register("coin", { required: true })}
                                        fullWidth
                                        id="coin"
                                        label="Coin"
                                        name="coin"
                                        autoComplete="coin"
                                        value={coin}
                                        required
                                        onChange={(e)=>setCoin(e.target.value)}
                                    />
                                {/* {errors.coin && <p style={{ color: "red" }}>Coin is required</p>} */}



                                </Grid> 
                                 <Grid item xs={12} sm={6}>
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input hidden accept="image/"
                                       {...register("Image", { required: true })}

                                         multiple type="file"
                                        
                                        //  value={Image}
                                        //  onChange={(e)=>{setImage(e.target.files)
                                        //     onChange={ImageChange}
                                        // }}
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required
                                         />
                                    </Button>
                                    {errors.Image && <p style={{ color: "red" }}> Image is required</p>}

                                   
                                   <img src={Image} style={{width:100, height:100}} />


                                </Grid>


                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    // onClick={handleSubmit}
    
                                >
                                    Add Users
                                </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/users" variant="body2">
                                        Back to all Users
                                    </Link>
                                </Grid>
                            </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </form>
    );
};

export default AddUser;
