import "./featured.scss";
import React, { useState, useEffect } from 'react'

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";

const Featured = () => {
  const [totalEarn, settotalEarn] = useState([])
  const getdata = async () => {
    let getAllRecordResponse = await axios.get("http://ec2-13-233-95-74.ap-south-1.compute.amazonaws.com:8080/api/v1/getAllPaymentsRecords");
    let amountList = getAllRecordResponse?.data?.getAllPaymentsRecords.map((doc, index) => {
      return doc["orderDetials"]?.amount
    })

    console.log(amountList)
    let totalearning = amountList.reduce(function (a, b) {
      return a + b;
    }, 0);
    settotalEarn(totalearning)
    console.log("totalEarn line 18 ------93939", totalEarn)



  }
  useEffect(() => {
    getdata()
  }, [])
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{totalEarn}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
