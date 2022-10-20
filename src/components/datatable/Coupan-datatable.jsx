import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { userColumns } from "../datatablesource/Get-coupan-datatablesource";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Coupan = () => {

  const [isdelete, setIsDelete] = useState(false);
  const [UUser , setUser] = useState([])
  const [ids, setIds] =useState([])
  const [username, setUsername]= useState([])
  const [coin, setCoin] = useState([])
  const [ phone , setPhone] = useState([])
  const navigate = useNavigate();

const  getdata = async()=>{


   let res = await axios.get("https://gymapibackend.herokuapp.com/api/v1/getAllCopuan");
    console.log("responce->",res.data.getAllCopuan)
    setUser(res.data.getAllCopuan)  
    const modifiedData = res.data.getAllCopuan
    .reduce(
      (prev, current) => [
        ...prev,
        {
          ...current,
          name: `${current.copuanTitle}`,
         id: current._id,
        //  Date: new Date(current.Date).toLocaleDateString(),
         createdAt: new Date(current.createdAt).toLocaleString(),
         expireAt: new Date(current.expireAt).toLocaleString()
        }
       ],[]
       )
       setUsername(modifiedData)
       setIsDelete(false)
   

}

  const handleDelete = (id) => {
    var data = JSON.stringify({
      "id": id
    });
    
    var config = {
      method: 'delete',
      url: 'https://gymapibackend.herokuapp.com/api/v1/deleteGYM',
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
            {/* <Link to="/:id" style={{ textDecoration: "none" }}>*/} 
              {/* <div onClick={() => {
                navigate("/edit-gym", {state: {gym:params.row}})
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





  return (
    <div className="datatable">
      <div className="datatableTitle">

        Coupan
        {/* <Link to="/gym/new" className="link">
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

export default Coupan;
