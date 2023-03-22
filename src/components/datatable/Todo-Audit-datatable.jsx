import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { auditColumns } from "../datatablesource/Todo-Audit-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Audit = () => {
    let navigate = useNavigate()
    const [audits, setAudits] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://localhost:8080/api/v1/todo/audits/all");
        const modifiedData = res.data.audits
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                }
                ], []
            )
            setAudits(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://localhost:8080/api/v1/todo/audits',
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
            Todo Audit List
          </div>
          <DataGrid sx={{
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
                "white-space": "normal !important",
                "word-wrap": "break-word !important",
              },
            }}
            className="datagrid"
            rows={audits}
            columns={auditColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default Audit;