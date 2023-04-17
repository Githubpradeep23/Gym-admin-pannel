import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { hrDiscountsColumns } from "../datatablesource/Hr-Discount-datatablesource";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HrDiscount = () => {
    let navigate = useNavigate()
    const [discounts, setDiscounts] = useState([])
    const [isdelete, setIsDelete] = useState(false);

    useEffect(async () => {
        let res = await axios.get("http://localhost:8080/api/v1/hr/discount/all");
        const modifiedData = res.data.discounts
            .reduce(
                (prev, current) => [
                ...prev,
                {
                    ...current,
                    id: current._id,
                    serviceName: current.gymService?.title,
                    category: current.gymService?.category,
                    serviceId: current.gymService?._id,
                    userName: current.userId?.firstName + (current.userId?.lastName ?? ''),
                    email: current.userId?.email,
                    clientNumber: current.userId?.number,
                    userId: current.userId?._id,
                }
                ], []
            )
            setDiscounts(modifiedData);
    }, [isdelete]);
    
    const handleDelete = (id) => {
        var data = JSON.stringify({
            "id": id
        });
        
        var config = {
            method: 'delete',
            url: 'http://localhost:8080/api/v1/hr/discount/delete',
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
                    navigate("/hr/discount/updateStatus", { state: { discount: params.row } })
                    }} className="viewButton">Update Status
                </div>
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
            Hr Discounts List
            <Link to="/hr/discount/new" className="link">
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
            rows={discounts}
            columns={hrDiscountsColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            allowColumnResizing={true}
          />
        </div>
      );
};

export default HrDiscount;