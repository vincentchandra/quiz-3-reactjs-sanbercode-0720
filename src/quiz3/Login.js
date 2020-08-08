import React,{useState, useContext, useEffect} from 'react'
import './public/css/style.css'
import IsLoginContext from '../IsLoginContext'

const Login = () => {
    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [isLogin, setIsLogin] = useContext(IsLoginContext)
    const [isRight, setIsRight] = useState(-1)
    const handleChangeUsername = (event) => {
        setInputUsername(event.target.value)
    }
    const handleChangePassword = (event) => {
        setInputPassword(event.target.value)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        if(inputUsername=="Vincent" && inputPassword=="Chandra"){
            setIsLogin(true);
            setIsRight(1)
        }else{
            setIsRight(0)
        }
        setInputUsername("")
        setInputPassword("")
    }
    
    
    
    return(
        <>
        <div className="login">
            <h1>Login Page</h1>
            <form style={{width:"100%"}} onSubmit={handleSubmit}>
            <div style={{textAlign:"center", marginBottom:"10px"}}>
                <label>Username: </label>
                <input type="text" value={inputUsername} onChange={handleChangeUsername}/>
            </div>
            <div style={{textAlign:"center", marginBottom:"10px"}}>
                <label>password: </label>
                <input type="password" value={inputPassword} onChange={handleChangePassword}/>
            </div>
            {
                isRight===0 && (
                    <p style={{color:"red", textAlign:"center"}}>Wrong username or password!</p>
                )
            }
            {
                isRight===1 && (
                    <p style={{color:"green", textAlign:"center"}}>Login Successful!</p>
                )
            }
            <div style={{justifyContent:"center",display:'flex',alignItems:'center'}}>
                <button>Login</button>
            </div>
            
            
        </form>
        </div>
    
        </>
    )
}

export default Login;