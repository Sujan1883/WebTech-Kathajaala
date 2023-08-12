import './Story.css';
import React from 'react'
import {useLocation} from 'react-router-dom'
import $ from 'jquery'



function Author(props){
    return(
        <div className='know'>
            Know the Author
        </div>
    )
}



function Name(props){
    return(
        <div className='Authorname'>
            {props.author}
        </div>
    )

}

function Bio(props){
    return(
        <div className='bio'>
            <h2>Bio : </h2>
            {props.bio}           
        </div>
    )
}

function Like(props){
    const buttonClick = ()=>{
        $.get("http://localhost:8080/like/"+props.title,(data)=>{
            let likes = props.likes
            $("#likes").text("Likes : "+(likes+1))
            $(".but").prop('disabled',true)
        })
    }
    return(
        <div className='like'>
            <button className='but' onClick={buttonClick}>Like</button>
            <p id="likes" style={{color:"beige"}}>Likes : {props.likes}</p>
        </div>
    )
}





function Title(props){
    return(
      <div className='Storytitle'>{props.title}</div>
    )
}


function Line(props){
    return(
        <div className='line'><hr style={{
            color:"black",
            height:3,
            width:1118,
            backgroundColor:"#471616",

        }}/></div>
    )
}

function Content(props){
    return(
        <div style={{
        padding:"15px 0px 60px 20px ",
        fontSize: "20px",
        color: "black",
        
        }}>{props.content}</div>
    )
}
  

function Rsidebar(props){
    return(
        <div className='side'>
            <Author {...props}/>
            
            <Name {...props}/>
            <Bio {...props}/>
            
            <Like {...props}/>
            
            
            
        </div>

    )
}

function Mid(props){
    return(
        <div className='mid'>
            <Title {...props}/>

            <Line/>
            <Content {...props}/>

        </div>
    )
}

function Story(props){
    const location = useLocation()
    console.log(location.state)
    return(
        
        <div className='main'>
            
            <Rsidebar author={location.state.author} bio={location.state.bio} title={location.state.name} likes={location.state.likes}/>
            <Mid title={location.state.name} content={location.state.content}/>            
            
                   
        </div>
    )

}

export default Story;