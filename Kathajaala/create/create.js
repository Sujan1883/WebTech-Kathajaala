import React from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import "./create.css"

function Create(props){
    
    const navigate = useNavigate()
    const createOnClick = (event)=> {
        event.preventDefault()
        if($("#createIp").val()!="" && $("#contentIp").val()!="" && $("#genreIp").val()!=""){
        console.log("Clicked")
        var data = {
            name:$("#createIp").val(),
            content:$("#contentIp").val(),
            author:props.user,
            genre:$("#genreIp").val(),
            likes:0
        }
        $.post("http://localhost:8080/create",data,function(data){
            
        })
        navigate('/home')
    }
    }
        return(
            <div className="body">
            <div className="title2">
            <h3>Create a new post</h3></div>
            <div className="formDiv" style={{
                backgroundColor:"#F3E8E8",
                padding:"20px",
                height:"500px",
                borderRadius:"30px",
                display:"flex",
                justifyContent:"left",
                border:"1px solid #471616"
            }}>
                <form style={{
                    padding:"50px",
                    width:"100%",
                    fontSize:"20px"
                }}>
                    <label>Title:</label><input type="text" id="createIp"></input>
                    <label>Genre:</label><select id="genreIp">
                        <option value="" disabled selected hidden>Choose a genre</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                    <br/>
                    <label>Content:</label><textarea id="contentIp"></textarea><br/>
                    <div style={{
                        textAlign:"center"
                    }}><button id="createSubmit" type="submit" onClick={createOnClick}>Create</button></div>
                </form>
            </div>
            </div>
        )
    }

export default Create