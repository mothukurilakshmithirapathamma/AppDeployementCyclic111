import React from 'react'
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation';

function Home() {

  let storeObj=useSelector((store)=>{
    console.log(store);
    return store;
  });
  let deleteProfile=async(req,res)=>{
let dataToSend=new FormData();
dataToSend.append("email",storeObj.loginReducer.userDatails.email);

let reqOptions={
  method:"DELETE",
  body:dataToSend,
}
let JSONData=await fetch("/deleteProfile",reqOptions);
let JSOData=await JSONData.json();
alert(JSOData.msg);
console.log(JSOData);

  }
  return (
    <div className='App'>
      <TopNavigation></TopNavigation>
      <button onClick={()=>{
deleteProfile();
      }}>Delete Profile</button>
        <h1>Home</h1>
        <h1>Wlcome🙏 {storeObj.loginReducer.userDatails.firstName} {storeObj.loginReducer.userDatails.lastName}</h1>
        <br></br>
        <img src='/${storeObj.loginReducer.userDatails.profilePic}' alt=''></img>
    </div>
  )
}

export default Home;