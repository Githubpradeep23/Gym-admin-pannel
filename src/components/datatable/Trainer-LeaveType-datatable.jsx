import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { trainerLeaveTypeColumns } from "../datatablesource/Trainer-LeaveType-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TrainerLeaveType = () => {
    let navigate = useNavigate()
    const [trainerLeaveType, setTrainerLeaveType] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/trainer/leaveType/all");
        const modifiedData = res.data.leaveTypes
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                }
                ], []
            )
            setTrainerLeaveType(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/trainer/leaveType/delete',
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
                <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                  Delete
                </div>
              </div>
            );
          },
        },
    ];

    return (
        <div className="datatable">
          <div className="datatableTitle">
            Trainer Leave Type List
            <Link to="/trainer/leaveType/new" className="link">
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
            rows={trainerLeaveType}
            columns={trainerLeaveTypeColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
    );
};

export default TrainerLeaveType;