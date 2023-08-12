import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import $ from 'jquery';
import "./Login2.css"


function Title(props){
    return(
      <div style={{
      paddingLeft:"100px",
      marginTop:"250px",
      marginRight:"100px",
      }} className="LoginTitle">
      <div style={{
      fontSize:"130px",
      color:"White",
      textDecoration:"3px underline",
      paddingBottom:"0px"//Styling For "Kathajaala"
      }}>Kathajaala </div>
      
      
      <div className='Sub' style={{
      fontSize:"50px",
        color:"White",//Styling For "World Of Stories"
        }}>World Of Stories...</div>
      </div>
    )
  }

function Seperator(props){
    return(
      <div style={{
        borderLeft:"1px solid beige",
        height:"550px",
        display:'flex',
        flexDirection:'row',
        marginTop:"100px",
        padding:"0px 0px 0px 100px",
        alignContent:'center',
        alignItems:'center'
      }}>
      </div> 
  )
  }
function Form(props){

  const navigate = useNavigate()

  const onClickLogin = (event)=>{
    event.preventDefault()
    if($(".name").val()!="" && $(".password").val()!=""){
    let data = {
      username:$(".name").val(),
      password:$(".password").val()
    }
    $.post("http://localhost:8080/login",data,(res)=>{
      if(res=="10") $("#alertmessage2").text("Username does not exist")
      else if(res=="11") $("#alertmessage2").text("Wrong Password")
      else if(res=="20"){
        navigate("/home")
      }
    })
  }
  }

  return(
    <div style={{
      padding:"10px 15px 0px 15px",
      fontSize:"35px",
      borderRadius:"25px",
      backgroundColor:"beige",
      margin:"130px",
      //padding:"100px",
      width: "450px",
      height: "450px",//Styling For Whole Box*/
  }}>
    
      <div className='ftitle'>Login</div>
      <form>
      <label className='FieldName'>Name</label><br/>
      <input type="text" placeholder="Enter Your Username" className="name"/><br></br>
      

      <label className='FieldPassword'>Password</label><br/>
      <input type="password" placeholder="Enter Your Password" className="password"/><br></br>
      
      <div style={{textAlign:"center"}}><button className="loginBut" onClick={onClickLogin}>Login</button></div>
      <div style={{textAlign:"center",fontSize:"15px"}} id="alertmessage2"></div>
      <div style={{textAlign:"center"}}><Link to="/signUp" className='NU'>New User ?? Sign Up</Link></div>

    </form>
    </div>
  )
}

function Body(props){
    return(
      <div style={{
        backgroundColor:'#471616',
        display:'flex',
        flexDirection:'row',
        height:"100vh",
      }}>
        <Title {...props}/>
        <br></br>
        <Seperator {...props}/>
        <Form {...props}/>
        <br></br>
      </div>
  
  )
}

function Login(props){
    return(
      <Body {...props}/>
    )
  }


export default Login;