import "./signup.css"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import $ from 'jquery'


function Title(props){
  return(
    <div className="SUtitle">Kathajaala</div>
  )
}

function Form(props){
const navigate = useNavigate()
const onClicked = (event)=>{
  event.preventDefault()
  if($(".SUname").val()!="" && $(".SUemail").val()!="" && $(".SUpass").val()!="" && $(".SUbio").val()!=""){
    let data = {
      username:$(".SUname").val(),
      emailId:$(".SUemail").val(),
      password:$(".SUpass").val(),
      bio:$(".SUbio").val()
    }
    $.post("http://localhost:8080/signup",data,(res)=>{
      console.log(res)
      if(res=="10") $("#alertmessage").text("Username already exists")
      else if(res=="11") $("#alertmessage").text("Account already exists in this email id")
      else if(res=="20"){
        navigate("/home")
      }
    })
  }
}

  return(
    <div className="SUbox" style={{
      backgroundColor:"beige",
      
      height:"530px",
      width:"600px",
      borderRadius:"30px",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",

     
  }}>
    <p className="SUacc">Create a new account</p><br></br>
    <form>
      <div className="SUform">
      <label>Username</label><br/>
        <input type="text" className="SUname"/><br></br>
      

      <label>Email ID</label><br></br>
        <input type="email" className="SUemail"/><br></br>
      

      <label>Password</label><br></br>
        <input type="password" className="SUpass"/><br></br>
      
      <label>Bio</label><br/>
        <input type="textarea" className="SUbio"/><br></br>
      
      <div style={{textAlign:"center",paddingTop:"20px",paddingBottom:"10px"}}>
        <button className="SUcreate" onClick={onClicked}>Create</button>
        </div>
      <div style={{textAlign:"center",fontSize:"15px"}} id="alertmessage"></div>
      <div style={{textAlign:"center"}}><Link to="/" className="SULink">Already have an account???Sign in</Link></div>

      </div>

    </form>
    
    </div>
  )
}

function Body(props){
    return(
      <div className="SignUpbody" >
        <Title {...props}/>
        
        <Form {...props}/>
        
      
      </div>
  
  )
}

function SignUp(props){
    return(
      <Body {...props}/>
    )
  }


export default SignUp;
