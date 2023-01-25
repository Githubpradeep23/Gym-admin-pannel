import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Beats Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          
            <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          </li>
          <p className="title">USER</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/demos" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>Demo</span>
            </li>
          </Link>
          {/* <Link to="/userdemolist" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>User Demo</span>
            </li>
          </Link> */}
          {/* <Link to="/voucher" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>Voucher</span>
            </li>
          </Link> */}
          <Link to="/coupan" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span>Coupon</span>
            </li>
          </Link>
          {/* <Link to="/package" style={{ textDecoration: "none" }}>
            <li>
              <OndemandVideoIcon className="icon" />
              <span> Package </span>
            </li>
          </Link> */}
          <p className="title">TRACK & TRANCE SECTION</p>
          <Link to="/weight" style={{ textDecoration: "none" }}>
            <li>
              <FitnessCenterIcon className="icon" />
              <span>track & trace section</span>
            </li>
          </Link>
          <p className="title">GYM</p>
          <Link to="/Gym-list" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceIcon className="icon" />
              <span>Gym Branch</span>
            </li>
          </Link>
          <Link to="/services" style={{ textDecoration: "none" }}>
            <li>
              <MiscellaneousServicesIcon className="icon" />
              <span>Gym Branch Services</span>
            </li>
          </Link>

          {/* <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <SportsGymnasticsIcon className="icon" />
              <span>Product</span>
            </li>
          </Link> */}
        
          {/* <Link to="/all-gym" style={{ textDecoration: "none" }}>
            <li>
              <SportsGymnasticsIcon className="icon" />
              <span>All Gym</span>
            </li>
          </Link> */}
          <p className="title">PURCHASE ORDER</p>
          <Link to="/purchase" style={{ textDecoration: "none" }}>
            <li>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Purchase Order</span>
            </li>
          </Link>

          <p className="title">BANNER</p>
          <Link to="/banners" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Banners</span>
            </li>
          </Link>
          <p className="title">COMPLAIN</p>

         
          <Link to="/complains" style={{ textDecoration: "none" }}>
            <li>
              <HowToRegIcon className="icon" />
              <span>Complains</span>
            </li>
          </Link>
          <p className="title">TESTIMONIALS</p>

          <Link to="/testimonials" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteSearchIcon className="icon" />
              <span>Testimonials</span>
            </li>
          </Link>
         {/* <p className="title">FAQS</p>

          <Link to="/questions" style={{ textDecoration: "none" }}>
            <li>
              <QuizIcon className="icon" />
              <span>Questions</span>
            </li>
          </Link>
          */} 
         
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          <li>
          
            <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
