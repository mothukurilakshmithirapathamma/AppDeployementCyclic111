import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


function Login() {

  let emailInputRef=useRef();
  let passwordInputRef=useRef();

  let navigate=useNavigate();
  let dispatch=useDispatch();

  useEffect(()=>{

    // validateToken();
  },[]);

  let validateToken=async()=>{
    
    
    if(localStorage.getItem("token")){

      let dataToSend=new FormData();
      dataToSend.append("token",localStorage.getItem("token"));
      
         let reqOptions={
          method:"POST",
          body:dataToSend,
         }
      
         let JSONData=await fetch("/validateLogin",reqOptions);

         let JSOData=await JSONData.json();
         if(JSOData.status==="success"){

          dispatch({type:"login",data:JSOData.data});
         navigate("/home");
        }else{
          alert(JSOData.msg);
        }
        console.log(JSOData);
    
         console.log(JSONData);
      
         }
      
    
  }

  let onLoginBtnClick=async()=>{
    
    let dataToSend=new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    let reqOptions={
      method:"POST",
      body:dataToSend
    };

    let JSONData=await fetch("/validateLogin",reqOptions);

    let JSOData=await JSONData.json();

    if(JSOData.status==="success"){

      localStorage.setItem("token",JSONData.data.token);
      dispatch({type:"login",data:JSOData.data});
     navigate("/home");
    }else{
      alert(JSOData.msg);
    }
    console.log(JSOData);

  };


let dispatchFunction=()=>{

  return async()=>{

    let dataToSend=new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);


    let response=await axios.post("/validateLogin",dataToSend);
    console.log(response);
  
    if(response.data.status==="success"){
      localStorage.setItem("token",response.data.data.token);
      dispatch({type:"login",data:response.data.data});
      navigate("/home");
    }else{
      alert(response.data.msg);
    }
   }

}


  return (
    <div className='App'>
     <img alt='' className='key' src='./Images/icons.png'></img>
    <form>
        <h2>LOGIN</h2>
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
       <div>
       <button type='button' onClick={()=>{
        dispatch(dispatchFunction());
       }}>Login</button>
       </div>
       <div>
        <p>Don't have an account?</p>
       <Link to="/signup">Signup</Link>
       </div> 
    </form>
</div>
  )
}

export default Login;