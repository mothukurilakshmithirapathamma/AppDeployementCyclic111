import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'



function TopNavigation() {
    let navigate=useNavigate();

    let storeObj=useSelector((store)=>{
        console.log(store);
        return store;
    });
    useEffect(()=>{
        if(storeObj.loginReducer.userDetails.email){
        console.log("valid Login");
       }else{
           console.log("Invalid Login");
            navigate("/");
       }});
  return (
    <nav>
   <NavLink to="/home">Home</NavLink>
   <NavLink to="/tasks">Tasks</NavLink>
   <NavLink to="/leaves">Leaves</NavLink>
   <NavLink to="/editProfile">EditProfile</NavLink>
   <NavLink onClick={()=>{
    localStorage.clear();
   }} to="/signout">SignOut</NavLink>
   </nav>
  )
}

export default TopNavigation