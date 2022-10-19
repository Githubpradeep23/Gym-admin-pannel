import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import List from "./pages/list/List";
import GymList from "./pages/list/Gym-Branch/Gym-branch";
import Weight from "./pages/list/Weight/Weight";
import Single from "./pages/single/Single";
import Gym from "./pages/list/Gym/Gym";
import Banners from "./pages/list/Banners/Banners";
import Services from "./pages/list/Services/Services";
import Testimonials from "./pages/list/Testimonials/Testimonials";
import AddUser from "./components/Adds/Add-User/Add-User";
import AddWeight from "./components/Adds/Add-weight/Add-weight";
import AddGym from "./components/Adds/Add-Gym/Add-Gym";
import EditGym from "./components/Edit/Edit-Gym/Edit-Gym";
import EditGymBranch from "./components/Edit/Edit-GymBranch/Edit-GymBranch";
import EditBanners from "./components/Edit/Edit-Banners/Edit-Banners";
import EditServices from "./components/Edit/Edit-Services/Edit-Services";
import EditTestimonial from "./components/Edit/Edit-Testimonial/Edit-Testimonial";
import AddGymBranch from "./components/Adds/Add-GymBranch/Add-GymBranch";
import AddBanners from "./components/Adds/Add-Banners/Add-Banners";
import AddGymBranchService from "./components/Adds/Add-GymServices/Add-GymServices";
import AddTestimonial from "./components/Adds/Add-Testimonials/Add-Testimonials";
import ComplainList from "./pages/list/Complains/Complains";
import AddQuestion from "./components/Adds/Add-Questions/Add-Questions";
import Questionslist from "./pages/list/Questions/Questions";
import AddCoin from "./components/Adds/Add-coin/Add-Coin";
import EditUser from "./components/Edit/Edit-User/Edit-User";
import DemoList from "./pages/list/Demo/Demo";
import Purchase from "./pages/list/Purchase/Purchase";
import FeedBacklist from "./pages/list/Feedback/Feedback";
import New from "./pages/new/New";
import ViewUser from "./components/Views/View-User";
import AddUserCoin from "./components/Adds/Add-User/Add-User-Coin";
// import UserDemo from "./components/datatable/User-Demo-datatable";
import UserDemoList from "./pages/list/User-Demo/UserDemo";
import AddDemo from "./components/Adds/Add-demo/Add-demo";
import EditDemo from "./components/Edit/Edit-Demo/Edit-Demo";
import AddVoucher from "./components/Adds/Add-Voucher/Add-Voucher";
import Voucher from "./pages/list/Voucher/Voucher";



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CoupanList from "./pages/list/Coupan/Coupan";
import PackageList from "./pages/list/Package/Package";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path="home" element={<Home />} />

            <Route path="users" element={<List />} />
            <Route path="users/new" element={<AddUser />} />
            <Route path="edit-user" element={<EditUser />} />
            <Route path="view-user" element={<ViewUser />} />
            <Route path="voucher" element={<Voucher />} />

            <Route path="add-voucher" element={<AddVoucher />} />
            {/* <Route path="userdemo" element={<UserDemo />} /> */}
            <Route path="userdemolist" element={<UserDemoList />} />
            <Route path="add-user-coin" element={<AddUserCoin />} />
            <Route path=":userId" element={<Single />} />

            <Route path="demos" element={<DemoList />} />
            <Route path="add-demo" element={<AddDemo />} />
            <Route path="edit-demo" element={<EditDemo />} />
            
            <Route path="Gym-list" element={<GymList />} />
            <Route path="edit-gym" element={<EditGym />} />
            <Route path="all-gym" element={<Gym />} />
            <Route path="gym/new" element={<AddGym />} />

            <Route path="edit-gymbranch" element={<EditGymBranch />} />
            <Route path="add-gymbranch" element={<AddGymBranch />} />

            <Route path="Weight" element={<Weight />} />
            <Route path="weight/new" element={<AddWeight />} />

            <Route path="banners" element={<Banners />} />
            <Route path="edit-banners" element={<EditBanners />} />
            <Route path="add-banners" element={<AddBanners />} />

            <Route path="services" element={<Services />} />
            <Route path="edit-services" element={<EditServices />} />
            <Route path="add-services" element={<AddGymBranchService />} />

            <Route path="testimonials" element={<Testimonials />} />
            <Route path="edit-testimonials" element={<EditTestimonial />} />
            <Route path="add-testimonials" element={<AddTestimonial />} />

            <Route path="complains" element={<ComplainList />} />

            <Route path="questions" element={<Questionslist />} />
            
            <Route path="purchase" element={<Purchase />} />

            <Route path="add-question" element={<AddQuestion />} />
            
            <Route path="feedback" element={<FeedBacklist />} />
            
            <Route path="add-coin" element={<AddCoin />} />

            <Route path="coupan" element={<CoupanList />} />
            
            <Route path="package" element={<PackageList />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
