import axios from 'axios';
import { useEffect,useState } from 'react';
import './profile.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Camera from '@mui/icons-material/Camera';

const Profile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showUpdateResults, setShowUpdateResults] = React.useState(false)
    const onEditButtonClick = () => setShowUpdateResults(!showUpdateResults)
    useEffect(() => {
        // console.log(routeLocation.state.gym);
        getProfile();
     
    }, []);

    const getProfile=async()=>{
        const res=await axios.get('http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/getAdminUserProfile');
        console.log('data',res)
        setEmail(res.data.AdminData[0].email);
        setName(res.data.AdminData[0].name);
        setPassword(res.data.AdminData[0].password);
        setPhone(res.data.AdminData[0].phoneNumber);
    }

    const handleForm = async (data) => {
        event.preventDefault();
        var data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("phoneNumber", phone);
        data.append("password", password);
        // data.append("expireAt", expireAt);
    
        var config = {
          method: "post",
          url: "http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/adminUpdateProfile",
          headers: { "Content-Type": "multipart/form-data" },
          data: data,
        };
    
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.alert("Profile Updated Successfully")
            // navigate('/coupan')
          })
          .catch(function (error) {
            window.alert("error")
            // console.log(error);
          });
      };

      const EditResults = () => (
        <form onSubmit={handleForm} >
        <fieldset>
            <div className="grid-35">
                <label htmlFor="fname">Name</label>
            </div>
            <div className="grid-65">
                <input type="text" className='input' id="fname" tabIndex="1" value={name} required onChange={(e) => setName(e.target.value)} />
            </div>
        </fieldset>
        <fieldset>
            <div className="grid-35">
                <label htmlFor="lname">Email</label>
            </div>
            <div className="grid-65">
                <input type="email" className='input' id="lname" tabIndex="2" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </div>
        </fieldset>
        <fieldset>
            <div className="grid-35">
                <label htmlFor="lname">Phone</label>
            </div>
            <div className="grid-65">
                <input type="number" className='input' id="lname" tabIndex="2" value={phone} required onChange={(e) => setPhone(e.target.value)} />
            </div>
        </fieldset>
        <fieldset>
            <div className="grid-35">
                <label htmlFor="lname">Password</label>
            </div>
            <div className="grid-65">
                <input type="text" className='input' id="lname" tabIndex="2" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </div>
        </fieldset>
            {/* <fieldset> */}
            <input type="button"  className="Btn cancel input" value="Cancel" />
            <input type="submit" className="Btn input" value="Update Profile" />
            {/* </fieldset> */}
        </form>
      )

    // const submitHandle = (e) => {
    //     e.preventDefault();
    //     alert(true);
    // }
    return (
        <>

            <div className="wrapper">
                <div className="profiless">
                    <div className="content">
                        <div>
                        <h1 >
                            <IconButton aria-label="expand row" onClick={onEditButtonClick} fontSize="large">
                                <Camera />
                            </IconButton>
                            Edit Profile 
                        </h1>
                        { showUpdateResults ? <EditResults /> : null }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;