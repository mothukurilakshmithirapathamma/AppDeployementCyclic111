import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import Tasks from "./components/Tasks";
import Leaves from "./components/Leaves";
import axios from "axios";


function App() {
  axios.defaults.baseURL="http://localhost:4545";
  if(localStorage.getItem("token")){
    axios.defaults.headers.common["Authorization"]=localStorage.getItem("token");
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/leaves" element={<Leaves/>}></Route>
      <Route path="/editProfile" element={<EditProfile/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
