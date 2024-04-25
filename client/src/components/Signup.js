import React from 'react'
import {Link} from "react-router-dom";
import { useRef ,useState} from 'react';

function Signup() {

    let [profilePic,setProfilePic]=useState("./images/noImage.png");

    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let ageInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let mobileNoInputRef=useRef();
    let profilePicInputRef=useRef();


    let sendDataToSeverUsingJSON=async()=>{

        let myHeader=new Headers();
        myHeader.append("content-type","application/json");

          let dataToSend={
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
            password:passwordInputRef.current.value,
            mobileNo:mobileNoInputRef.current.value,
            profilePic:profilePicInputRef.current.value,
          }

        let reqOptions={
            method:"POST",
            headers: myHeader,
            body:JSON.stringify(dataToSend),
        };

        let JSONData=await fetch("/signup",reqOptions);

        let JSOData = await JSONData.json();

        alert(JSOData.msg);
        console.log(JSOData);
    }

    let sendDataToSeverUsingURLE=async()=>{
        let myHeader=new Headers();
        myHeader.append("content-type application/x-www-form-urlencoded");

        let dataToSend=new URLSearchParams();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value);
        dataToSend.append("profilePic",profilePicInputRef.current.value);



        let reqOptions={
            method:"POST",
            headers:myHeader,
            body:dataToSend,
        }
        let JSONData=await fetch("/signup",reqOptions);

        let JSOData = await JSONData.json();

       
        console.log(JSOData);

    }

    
    let sendDataToSeverUsingFD=async()=>{
       

        let dataToSend=new FormData();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobileNo",mobileNoInputRef.current.value);

        for(let i=0;i<=profilePicInputRef.current.files.length;i++){
            dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
        }

        let reqOptions={
            method:"POST",
            body:dataToSend,
        }
        let JSONData=await fetch("/signUp",reqOptions);

        let JSOData = await JSONData.json();

        alert(JSOData.msg);
        console.log(JSOData);

    }

  return (
    <div className='App'>
        <form className='signup'>
            <h2>SIGNUP</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}></input>
            </div>
            <div>
                <label>Mobile No</label>
                <input ref={mobileNoInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input 
                multiple
                type='file' ref={profilePicInputRef} onChange={(eventObj)=>{

                    let selectedPicPath=URL.createObjectURL(eventObj.target.files[0]);
                    setProfilePic(selectedPicPath);

                }}></input>
                <br></br>
                <img alt=''className='profilePic' src={profilePic}></img>
                <div>
           <button type='button' onClick={()=>{
              
              sendDataToSeverUsingJSON();

           }}>Signup(JSON)</button>
            <button type='button' onClick={()=>{
              
              sendDataToSeverUsingURLE();

           }}>Signup(URLE)</button>
            <button type='button' onClick={()=>{
              
              sendDataToSeverUsingFD();

           }}>Signup(FD)</button>
           </div>
            </div>
         
           <br></br>
       <Link to="/">Login</Link>
        </form>
    </div>
  )
}

export default Signup;