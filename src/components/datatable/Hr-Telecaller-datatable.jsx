import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { hrTelecallerColumns } from "../datatablesource/Hr-Telecaller-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HrTelecaller = () => {
    let navigate = useNavigate()
    const [telecallers, setTelecallers] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/hr/telecaller/all");
        const modifiedData = res.data.telecallers
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.service?.title,
                    category: current.service?.category,
                    serviceId: current.service?._id,
                }
                ], []
            )
            setTelecallers(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://ec2-3-27-62-205.ap-southeast-2.compute.amazonaws.com:8080/api/v1/hr/telecaller/delete',
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
            Hr Telecaller List
            <Link to="/hr/telecaller/new" className="link">
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
            rows={telecallers}
            columns={hrTelecallerColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default HrTelecaller;