import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { userColumns } from "../datatablesource/Purchase-datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ContactMailOutlined } from "@mui/icons-material";


const GymDatatable = () => {
  const navigate = useNavigate();

  const [isdelete, setIsDelete] = useState(false);
  const [UUser , setUser] = useState([])
  const [ids, setIds] =useState([])
  const [username, setUsername]= useState([])
  const [coin, setCoin] = useState([])
  const [ phone , setPhone] = useState([])

  const getdata = async ()=>{

    let res = await axios.get("https://gymapibackend.herokuapp.com/api/v1/getAllPaymentsRecords");
         let data = res.data.getAllPaymentsRecords.map((doc,index)=>{
        return ( {
          
               _id  : doc._id,
               voucherID:  doc.voucherID,
               orderPaymentID : doc["orderDetials"]?.id,
               amount : doc["orderDetials"]?.amount,
               amount_due : doc["orderDetials"]?.amount_due,
               currency : doc["orderDetials"]?.currency,
               receipt : doc["orderDetials"]?.receipt,
               status : doc["orderDetials"]?.status,
               date : new Date(doc["orderDetials"]?.created_at).toISOString()  
            })
         })
         console.log("data line --------------------",data)
     setUser(data)  
     const modifiedData =data.reduce(
       (prev, current) => [
         ...prev,
         {
           ...current,
           name: `${current.branchName}`,
          id: current._id
          
         }
        ],[]
        )
        setUsername(modifiedData)
        setIsDelete(false)
        console.log("result->", UUser)

  }  
  console.log("users->", UUser)


  const handleDelete = (id) => {
     console.log("id yeh hai=>", id)

     var data = JSON.stringify({
      "id": id
    });
    
    var config = {
      method: 'delete',
      url: 'https://gymapibackend.herokuapp.com/api/v1/deleteGymBranch',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setIsDelete(true)

    })
    .catch(function (error) {
      console.log(error);
    });


  };
  useEffect(() => {
    getdata()
  }, [isdelete])
  


  const actionColumn = [
    {
    //   field: "action",
    //   headerName: "Action",
    //   width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          {/* <div onClick={() => {
            navigate("/edit-gymbranch", {state: {gym:params.row}})
          }} className="viewButton">Edit</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
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

       Purchase Order
        {/* <Link to="/add-gymbranch" className="link">
          Add New
        </Link> */}
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

export default GymDatatable;
