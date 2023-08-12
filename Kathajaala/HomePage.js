import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import "./Home.css";


export function SearchBar(){
  const navigate = useNavigate()
  const searchBook = ()=>{
    if($("#searchIp").val()!=""){
      navigate("/search",{state:{input:$("#searchIp").val()}})
    }
    else{
      navigate("/home")
    }
  }

  return(
    <div>
    <input id="searchIp" type="text" placeholder='Search your favourite books'></input>
    <button id="searchBut" onClick={searchBook}>Search</button>
    </div>
  )
}


export function Book(props){
  const navigate = useNavigate()
  const bookOnClick = ()=>{
    var senddata = {}
    $.get("http://localhost:8080/book/"+props.title,(data)=>{
      senddata = data
    })
    $.get("http://localhost:8080/author/"+props.author,(data)=>{
      senddata.bio = data.bio
  })
  navigate("/content",{state:senddata})
  }
  return(
    <div className="book" onClick={bookOnClick}>
      <h3>{props.title}</h3>
      <h4>{props.author}</h4>
    </div>
  )
}



function BookSet(props){
  var bookData = []
  var books = []
  var i = 0
  $.ajaxSetup({async:false})
  $.get("http://localhost:8080/"+props.genre,(data)=>{
    bookData = data.bookData
  }) 
  for(i=0;i<6;i++){
    if(bookData[i]){
    books.push(<Book author={bookData[i].author} title={bookData[i].name} key={i}/>)
    }
  }
    return(
        <div style={{
            paddingLeft:"40px",
            paddingTop:"20px"
          }}>
            <h2 style={{
              marginTop:"0px",
                paddingLeft:"20px",
                color:"#471616"
            }}>{props.genre}</h2>
        {books}
        </div>
    )
}


function Body(props){
    return(
    <div style={{
      margin:"0px",
      backgroundColor:"#fff5f3",
      paddingTop:"10px"
    }}>
      <div style={{
        textAlign:"center",
      }}><SearchBar/></div>
      <BookSet genre="Mystery" {...props}/>
      <br/>
      <hr/>
      <BookSet genre="Comedy" {...props}/>
      <br/>
      <hr/>
      <BookSet genre="Adventure" {...props}/>
      <br/>
      <hr/>
      <BookSet genre="Horror" {...props}/>
      <br/>
      <hr/>
      <BookSet genre="Drama" {...props}/>
      <br/>
      <hr/>
      <BookSet genre="Thriller" {...props}/>
      <br/>
    </div>
  
  )
  }

function Home(props){
  return(
    <Body {...props}/>
  )
}



export default Home;