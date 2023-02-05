import "./widget.scss";
import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";


const Widget = ({ type }) => {
  const [username, setUsername] = useState([])
  const [totalOrdes, settotalOrdes] = useState([])
  const [totalUser, settotalUser] = useState([])
  const [totalEarn, settotalEarn] = useState([])
  const getdata = async () => {

    let res = await axios.get("http://ec2-43-206-107-226.ap-northeast-1.compute.amazonaws.com:8080/api/v1/getAllPaymentsRecords");
    let apiData = res.data.getAllPaymentsRecords;
    let totalOrder = apiData.length
    settotalOrdes(totalOrder)
    console.log("totalOrdes line 18 ", totalOrdes)

    let ress = await axios.get("http://ec2-43-206-107-226.ap-northeast-1.compute.amazonaws.com:8080/api/v1/getAllUsers");
    let apiDatas = ress.data.getAllUsers;
    let totalUsers = apiDatas.length
    settotalUser(totalUsers)
    console.log("totalOrdes line 18 ", totalUser)
    let getAllRecordResponse = await axios.get("http://ec2-43-206-107-226.ap-northeast-1.compute.amazonaws.com:8080/api/v1/getAllPaymentsRecords");
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





  let data;

  //temporary
  // const amount = totalOrdes;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: totalUser,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: true,
        amount: totalOrdes,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        amount: totalEarn,

        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney} {data.amount}
        </span>
        {/* <span className="link">{data.link}</span> */}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
