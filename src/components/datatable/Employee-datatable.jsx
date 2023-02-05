import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { employeeColumns } from "../datatablesource/Employee-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    let navigate = useNavigate()
    const [ids, setIds] = useState([])
    const [employees, setEmployees] = useState([])
    const [isdelete, setIsDelete] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://localhost:8080/api/v1/employee/getAll");
        const modifiedData = res.data.getAllEmployee
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    employeeName: current.firstName + (current.lastName ?? ''),
                    createdAt: new Date(current.createdAt).toLocaleString(),
                    status: current.status ? 'ACTIVE' : 'INACTIVE'
                }
                ], []
            )
        setEmployees(modifiedData);
        setUpdateStatus(false)
    }, [isdelete, updateStatus]);

    const handleUpdateStatus = (id) => {
        var data = JSON.stringify({
          "id": id
        });
        var config = {
          method: 'put',
          url: 'http://localhost:8080/api/v1/employee/updateStatus',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setUpdateStatus(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      };
    
      const handleDelete = (id) => {
        var data = JSON.stringify({
          "id": id
        });
        
        var config = {
          method: 'delete',
          url: 'http://localhost:8080/api/v1/employee/delete',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setIsDelete(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      };

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <div onClick={() => {
                    navigate("/employee/update", { state: { employee: params.row } })
                    }} className="viewButton">Edit</div>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
                <div
                  className="deleteButton"
                  onClick={() => handleUpdateStatus(params.row.id)}
                >
                  Update Status
                </div>
              </div>
            );
          },
        },
      ];

    return (
        <div className="datatable">
          <div className="datatableTitle">
            Employees List
            <Link to="/employee/new" className="link">
                Add New
            </Link>
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={employees}
            columns={employeeColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default Employees;