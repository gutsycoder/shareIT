import { useState } from "react";

export default function RegisterPage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    async function register(ev){
        ev.preventDefault();
        console.log("Reached Here")
        const response = await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
        console.log("Reached hereeee");
        
        const responseData=await response.json();
        console.log(responseData);
        if(response.status===200){
            alert("Registration Successfull");
        }else{
            alert(responseData.message);
        }
    }


    return(
        <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" value={username}
        onChange={ev=>setUsername(ev.target.value)}></input>
        <input type="password" placeholder="password" value={password}
        onChange={ev=>setPassword(ev.target.value)}></input>
        <button>Register</button>
    </form>
    )
}