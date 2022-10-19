import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Datatable = () => {
  let navigate = useNavigate()
  const [data, setData] = useState();
  const [UUser, setUser] = useState([])
  const [ids, setIds] = useState([])
  const [username, setUsername] = useState([])
  const [isdelete, setIsDelete] = useState(false);

  const [coin, setCoin] = useState([])
  const [phone, setPhone] = useState([])

  const  getDate  =async()=>{
    let res = await axios.get("https://gymapibackend.herokuapp.com/api/v1/getAllUsers");
    console.log("responce->", res?.data?.getAllUsers?.map((x) => x?.profilePicture?.url))
    setUser(res.data.getAllUsers)
    const modifiedData = res.data.getAllUsers
      .reduce(
        (prev, current) => [
          ...prev,
          {
            ...current,
            name: `${current.username}`,
            id: current._id,
            Date: new Date(current.Date).toLocaleDateString(),

          }
        ], []
      )
    setUsername(modifiedData)
    setIsDelete(false);
  }
 


  const handleDelete = (id) => {
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "delete",
      url: "https://gymapibackend.herokuapp.com/api/v1/deleteUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setIsDelete(true);
      })
      .catch(function (error) {
        window.alert("delete fail")
        console.log(error);
      });

  };
  useEffect(() => {
    getDate();
  }, [isdelete]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div onClick={() => {
               navigate("/add-coin", {state: {gym:params.row}})
              }} className="viewButton">Edit</div> */}
            <div onClick={() => {
              navigate("/edit-user", { state: { gym: params.row } })
            }} className="viewButton">Edit</div>
            <div onClick={() => {
              navigate("/view-user", { state: { gym: params.row } })
            }} className="viewButton">View</div>
            <div onClick={() => {
              navigate("/add-user-coin", { state: { gym: params.row } })
            }} className="viewButton">add-coin</div>
            <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>

          <div onClick={() => {
            navigate("/add-voucher", { state: { gym: params.row } })
          }} className="viewButton">Add Coupan</div>
           
          </div>

        );
      },
    },
  ];



  // const DATA = [
  //   {
  //     id: 1,
  //     username: "lol",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     status: "active",
  //     email: "1snow@gmail.com",
  //     age: 35,
  //   },]
  // const DATA = [
  //   {
  //     id: ids,
  //     username: username,
  //     coin: coin,
  //     number: phone,
  //   },]

  return (
    <div className="datatable">
      <div className="datatableTitle">

        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={username}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;       
