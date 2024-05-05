import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(()=>{
      const fetchData = async()=>{
        try{
          const response = await fetch('http://localhost:4000/profile',{
            credentials:'include'
          });
          const responseData = await response.json();
          if(responseData.data){
            console.log("Setting User Info");
            setUserInfo(responseData.data);
          } 
          

        }catch(error){
          console.log("Error While Fetching the data",error);
        }
    }
fetchData();
},[]);

function logout(){
  fetch('http://localhost:4000/logout',{
    credentials:'include',
    method:'POST'
  })
  setUserInfo(null);
}

  const username = userInfo?.username;


    return(<>
    <header>
        <Link to="/" className='logo'>MyBlog</Link>
        <nav>
          {username && (
            <><Link to="/create">Create New Post</Link>
            <a onClick={logout}>Logout</a>
            </>
            
          )}
          {!username &&(
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
         )}
        </nav>
      </header>
    
    </>)
}