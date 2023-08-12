import React from "react";
import "./Genre.css"
import { Book } from "../HomePage";
import { useNavigate,useLocation } from "react-router-dom";
import $ from 'jquery'

export function SideBar(props){
    const navigate = useNavigate()
    const handleClick = (event)=>{
        navigate("/genre",{state:{genre:event.target.getAttribute("id")}})
    }

    return(
        <div style={{
            backgroundColor:"#471616",
            height:"100vh",
            width:"400px",
            color:"azure",
            textAlign:"center",
            fontSize:"30px",
            paddingTop:"50px",
            marginTop:"-5px"
        }}>
            <div className="genreSections" id="Horror" onClick={handleClick}>Horror</div>
            <div className="genreSections" id="Adventure" onClick={handleClick}>Adventure</div>
            <div className="genreSections" id="Mystery" onClick={handleClick}>Mystery</div>
            <div className="genreSections" id="Comedy" onClick={handleClick}>Comedy</div>
            <div className="genreSections" id="Drama" onClick={handleClick}>Drama</div>
            <div className="genreSections" id="Thriller" onClick={handleClick}>Thriller</div>
        </div>
    )
}

function GenrePage(){
    const location = useLocation()
    var bookData = []
    var books = []
    var i = 0
    $.ajaxSetup({async:false})
    $.get("http://localhost:8080/"+location.state.genre,(data)=>{
      bookData = data.bookData
    })

    if(bookData.length!=0){
    for(i in bookData){
      books.push(<Book author={bookData[i].author} title={bookData[i].name} key={i}/>)
    }
    
    return(
        <div style={{
            paddingLeft:"40px",
            paddingTop:"20px",
            height:"500px"
          }}>
            <h2 style={{
              marginTop:"0px",
                paddingLeft:"20px",
                color:"#471616"
            }}>{location.state.genre}</h2>
        {books}
        </div>
    )
          }
  else{
      console.log("Not Found")
      return(
          <div style={{
              paddingLeft:"40px",
              paddingTop:"20px",
              height:"500px",
              textAlign:"center",
              paddingTop:"100px"
            }}>
              <h2 style={{
                marginTop:"0px",
                paddingLeft:"20px",
                color:"#471616"
              }}>No Results Found</h2>
          </div>
      )
  }
}

export default GenrePage