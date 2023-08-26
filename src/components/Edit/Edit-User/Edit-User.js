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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const theme = createTheme();

const EditUser = ({ route }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [coin, setcoin] = useState("");
  const [branch, setbranch] = useState("");
  const [user_Address, setUser_Address] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [userType, setUserType] = useState("");
  const [DOB, setDOB] = useState("");
  const [Image, setImage] = useState(null);
  const [Id, setIds] = useState("");

  // ======================================
  const [date, setDate] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [time, setTime] = React.useState(dayjs("2014-08-18T21:11:54"));

  const DateChange = (newValue) => {
    setDate(newValue);
  };
  // ==================================================

  const params = new URLSearchParams(window.location.search);
  for (const param of params) {
    console.log(param);
    // setIds(param)
  }
  const routeLocation = useLocation();
  useEffect(() => {
    console.log(routeLocation.state.gym);
    setIds(routeLocation.state.gym.id);
    setnumber(routeLocation.state.gym.number);
    setcoin(routeLocation.state.gym.coin);
    setUser_Address(routeLocation.state.gym.user_Address);
    setbranch(routeLocation.state.gym.postal_code);
    setfirstName(routeLocation.state.gym.firstName);
    setemail(routeLocation.state.gym.email);
    setImage(routeLocation.state.gym.Image);
    setDate(routeLocation.state.gym.Date);
    setlastName(routeLocation.state.gym.lastName);
    setgender(routeLocation.state.gym.gender);
    setUserType(routeLocation.state.gym.userType);
  }, []);

  const onSubmit = async (data) => {
    console.log("Login submit click");
    console.log("Ids of user =>", Id);
    console.log("firstName =>", firstName);
    console.log("number =>", number);
    console.log("coin =>", coin);
    console.log("branch =>", branch);
    console.log("postal_code =>", user_Address);
    console.log("Image =>", Image);

    var data = new FormData();
    data.append("id", Id);
    data.append("profilePicture", Image);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("gender", gender);
    data.append("userType", userType);
    data.append("DOB", date);
    data.append("email", email);
    data.append("number", number);
    data.append("user_Address", user_Address);
    data.append("postal_code", branch);
    data.append("coin", coin);

    console.log("data dek loo =>", data)

    const res = await axios.put(
      "http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/editUser",
      data
    );
    console.log("responce",res);
    if (res.status === 200) {
      window.alert("success")
      navigate("/users");
    } else{
      window.alert("fail")

      console.log("error");
  
    } 
      
  };
  // function ImageChange(e) {
  //   console.log(e.target.files);
  //   setImage(URL.createObjectURL(e.target.files[0]));
  // }
  // function ImageChange(e) {
  //   console.log(e.target.files);
  //   setImage(e.target.files[0]);
  // }

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
              Edit User
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    {...register("firstName", { required: true })}
                    fullWidth
                    id="firstName"
                    label="Fisrt Name"
                    autoFocus
                    value={firstName}
                    required
                    onChange={(e) => setfirstName(e.target.value)}
                    // value={student.firstName}
                  />
                  {/* {errors.firstName && (
                    <p style={{ color: "red" }}> User Name is required</p>
                  )} */}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Last Name"
                    {...register("lastName", { required: true })}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    required
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <select
                    id="gender"
                    className="form-select"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value={""} disabled>
                      Choose Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  {errors.gender && (
                    <p style={{ color: "red" }}>Gender is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <select
                    id="type"
                    className="form-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}>
                    <option value={""} disabled>
                      Choose Type
                    </option>
                    <option value="PERMANENT">Permanent</option>
                    <option value="TEMPORARY">Temporary</option>
                  </select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={DateChange}
                        renderInput={(params) => <TextField {...params} />}
                 />
                    </Stack>
                  </LocalizationProvider>
                  {errors.DOB && (
                    <p style={{ color: "red" }}>DOB is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="user_Address"
                    label="User Address"
                    name="User Address"
                    autoComplete="User Address"
                    value={user_Address}
                    onChange={(e) => setUser_Address(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // {...register("number", { required: true })}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 10,
                      minLength: 10,
                    }}
                    fullWidth
                    required
                    id="number"
                    label="Number"
                    name="Number"
                    autoComplete="Number"
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                    // value={student.email}
                  />
                  {/* {errors.number && (
                    <p style={{ color: "red" }}> number is required</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // {...register("coin", { required: true })}
                    fullWidth
                    id="coin"
                    label="Coin"
                    name="Coin"
                    autoComplete="Coin"
                    value={coin}
                    onChange={(e) => setcoin(e.target.value)}
                    required
                    // value={student.email}
                  />
                  {/* {errors.coin && (
                    <p style={{ color: "red" }}> coin is required</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 
                  maxLength: 6,
                  minLength: 6,
                                                         
             }}
                    // {...register("branch", { required: true })}
                    fullWidth
                    id="branch"
                    label="Postal Code"
                    name="Branch"
                    autoComplete="Branch"
                    value={branch}
                    onChange={(e) => setbranch(e.target.value)}
                    required
                    // value={student.email}
                  />
                  {/* {errors.branch && (
                    <p style={{ color: "red" }}> branch is required</p>
                  )} */}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      // {...register("Image", { required: true })}
                      multiple
                      type="file"
                      value={Image}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                  {errors.Image && (
                    <p style={{ color: "red" }}> Image is required</p>
                  )}

                  {/* {console.log(Image)} */}
                  <img src={Image} style={{ width: 100, height: 100 }} />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  edit User
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/users" variant="body2">
                      Back to all Users
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

export default EditUser;
