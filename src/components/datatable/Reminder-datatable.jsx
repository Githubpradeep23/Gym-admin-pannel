import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reminderColumns } from "../datatablesource/Reminder-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns'

const RenewalReminder = () => {
    let navigate = useNavigate()
    const [renewalReminder, setRenewalReminder] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/todo/reminder");
        const modifiedData = res.data.renewalReminders
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                    activeTo: format(new Date(current.activeTo), 'MM/dd/yyyy'),
                    activeFrom: format(new Date(current.activeFrom), 'MM/dd/yyyy'),
                    userName: current.userId?.firstName + (current.userId?.lastName ?? ''),
                    email: current.userId?.email,
                    number: current.userId?.number,
                    done: current.done ? 'YES' : 'NO',
                    notDone: current.notDone ? 'YES' : 'NO',
                    reminderSMS: current.reminderSMS ? 'YES' : 'NO',
                    followUpCall: current.followUpCall ? 'YES' : 'NO'
                }
                ], []
            )
            setRenewalReminder(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/todo/deleteReminder',
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
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
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
            Renewal Reminder List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={renewalReminder}
            columns={reminderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default RenewalReminder;