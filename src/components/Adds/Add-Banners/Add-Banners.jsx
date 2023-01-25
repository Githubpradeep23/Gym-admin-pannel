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
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const theme = createTheme();
const AddBanners = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const onSubmit = async (data) => {
    // event.preventDefault();

    console.log("data =>", data);
    console.log("Login submit click");
    console.log("title =>", title);
    console.log("category =>", category);
    console.log("bannerImage=>", bannerImage);
    console.log("description=>", description);

    var data = new FormData();
    data.append("image", bannerImage);
    data.append("title", title);
    data.append("category", category);
    data.append("description", description);

    var config = {
      method: "post",
      url: "http://ec2-35-76-120-158.ap-northeast-1.compute.amazonaws.com:8080/api/v1/addBanner",
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.alert("success")
        
        navigate("/banners");
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
              Add Banners
            </Typography>

            <Box
              // component="form"
              // noValidate
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("title", { required: true })}
                    autoComplete="title"
                    name="title"
                    fullWidth
                    id="title"
                    label="banner title"
                    required
                    autoFocus
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  {/* {errors.title && (
                    <p style={{ color: "red" }}>Banner Title is required</p>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("description", { required: true })}
                    autoComplete="description"
                    id="outlined-multiline-static"
                    multiline
                    rows={10}
                    name="description"
                    label="banner description"
                    required
                    autoFocus
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                  {/* {errors.description && (
                    <p style={{ color: "red" }}>Description is required</p>
                  )} */}
                </Grid>

                <Grid item xs={12} sm={6} mt={-27}>
                  <select
                    {...register("category", { required: true })}
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                  >
                    <option value={""} disabled>
                      Choose Category
                    </option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="academy">Academy</option>
                  </select>
              
                  {errors.category && (
                    <p style={{ color: "red" }}>Category is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} mx={0.5} mt={-7}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      accept="image/*"
                      {...register("bannerImage", { required: true })}
                      multiple
                      // required
                      type="file"
                      //  value={bannerImage}
                      onChange={(e) => setbannerImage(e.target.files[0])}
                    />
                  </Button>
                  {errors.bannerImage && (
                    <p style={{ color: "red" }}>Image is required</p>
                  )}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={handleSubmit}
                >
                  Add Banners
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/banners" variant="body2">
                      Back to banners
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

export default AddBanners;
