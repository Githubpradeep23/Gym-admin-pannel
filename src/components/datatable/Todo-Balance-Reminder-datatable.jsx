import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { balanceReminderColumns } from "../datatablesource/Todo-Balance-Reminder-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BalanceReminder = () => {
    let navigate = useNavigate()
    const [balanceReminders, setBalanceReminders] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/todo/balanceReminder/all");
        const modifiedData = res.data.balanceReminders
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                    userName: current.userId?.firstName + (current.userId?.lastName ?? ''),
                    email: current.userId?.email,
                    clientNumber: current.userId?.number
                }
                ], []
            )
            setBalanceReminders(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/todo/balanceReminder',
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
            Todo Balance Reminder List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={balanceReminders}
            columns={balanceReminderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default BalanceReminder;