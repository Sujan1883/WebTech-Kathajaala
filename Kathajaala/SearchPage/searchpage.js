import React from 'react'
import $ from 'jquery'
import {useLocation} from 'react-router-dom'
import { SearchBar,Book } from '../HomePage';


function SearchBookSet(props){
    const location = useLocation()
    var bookData = []
    var books = []
    var i = 0
    $.ajaxSetup({async:false})
    $.get("http://localhost:8080/search/"+location.state.input,(data)=>{
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
              }}></h2>
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

function Searched(){
    return(
        <div style={{
            textAlign:"center",
            paddingTop:"10px",
            backgroundColor:"#fff5f3",
        }}><SearchBar/>
        <SearchBookSet/>
        </div>
    )
}

export default Searched;