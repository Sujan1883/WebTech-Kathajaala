import React from 'react';
import SignUp from "./SignUp/signup"
import Home from './HomePage'
import Create from "./create/create"; 
import Searched from './SearchPage/searchpage';
import Login from './LoginUi/Login2';
import GenrePage from './Genre/Genre';
import { SideBar } from './Genre/Genre';
import "./App.css"
import $ from 'jquery'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import Story from './content/Story';

function Title(){
    return(
      <div className='title'>
        <h1 style={{
          fontSize:"150px",
          margin:"0px",
        }}>Kathajaala</h1>
      </div>
    )
  }
  
  function NavBar(){
    return(
        <div style={{
          height:"50px",
          backgroundColor:"#471616",
          position:"sticky",
          top:"0px",
          padding:"5px",
          textAlign:"center",
          borderBottomLeftRadius:"10px",
          borderBottomRightRadius:"10px",
        }}>
        <ul style={{
          margin:"0px",
          padding:"0px",
          paddingLeft:"15px",
          fontSize:"30px",
          color: "azure",
          display:"flex",
          justifyContent:"left",
          listStyle: "none"
        }}>
        <li className='navbarlistItem'><Link className='navbarItems' to="/home">Home</Link></li>
        <li className='navbarlistItem'><Link className='navbarItems' to="/genre" state={{genre:"Choose a genre",books:[]}}>Genre</Link></li>
        <li className='navbarlistItem'><Link className='navbarItems' to="/create">Create</Link></li>
        </ul>
        </div>
      )
  }
  

class App extends React.Component{

  

  constructor(){
    super()
    this.state = {
      user:"",
    }
    
  }
  componentDidMount(){
    $.get("http://localhost:8080/currentUser",(data)=>{
      this.setState({
        user:data.currentUser
      })
    })
  }

  render(){  
  return(
        <div>
            <Router> 
            <Routes>
              <Route exact path="/" element={<Login onLogin={this.onLogin}/>}></Route>
              <Route path="/signUp" element={<SignUp onSignUp={this.onLogin}/>}></Route>
                <Route path="/home" element={<div>
                <Title/> 
                <NavBar/>
                <Home/></div>}></Route>
                <Route path="/create" element={<div><NavBar/><Create user={this.state.user}/></div>}></Route>
                <Route path="/content" element={<div><NavBar/><Story/></div>}></Route>
                <Route path="/genre" element={<div>
                  <NavBar/>
                  <div style={{
                    display:"flex",
                    flexDirection:"row"
                  }}>
                    <SideBar/>
                  <GenrePage/>
                  </div>
                  </div>}></Route>
                <Route path="/search" element={<div><Title/><NavBar/><Searched/></div>}></Route>
            </Routes>
            </Router>
        </div>
    )
  }

}

export default App;