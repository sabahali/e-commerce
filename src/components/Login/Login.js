import React, { useState } from 'react'
import './login.css'
import { useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addCredentials } from '../../features/User/authSlice'
import { useLoginMutation } from '../../features/User/authApiSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const[login,{data,isSuccess}] = useLoginMutation()
 
  const loguserRef = useRef();
  const logpwdref = useRef();
  const signuserRef = useRef();
  const signpwdref = useRef();
  const signcnfpwdRef = useRef();
  const signemailRef = useRef()
  const dispatch = useDispatch()
  const[signpwd,setSignpwd] = useState('')
  const[signcnfpwd,setSigncnfpwd] = useState('')



const navigate = useNavigate()
    

  const handleLoginSubmit = async () => {
    if (loguserRef.current.value !== '' && logpwdref.current.value !== '') {
      console.log(loguserRef.current.value, logpwdref.current.value);
     
      const credentials = {username: loguserRef.current.value,pwd: logpwdref.current.value,}
       const data = await login(credentials).unwrap()
       console.log(data)
      if(data?.username){
        console.log(data)
        dispatch(addCredentials({ username: data.username, email: data.email, accesstoken: data.accesstoken,role:data.role }))

        
        navigate('/home')
      }else{
        alert("please provide valid credentials")
        
      }
      
    } else {
      alert("Please Provide Valid Username and Password")
    }
  }

  const handleSignSubmit = async () => {
    if (signemailRef.current.value !== '' && signuserRef.current.value !== '' && signpwdref.current.vlaue !== '' && signcnfpwdRef.current.vlaue !== '') {
      if (signpwd !== signcnfpwd) {
        alert("password and confirm pwd not matching")
        return
      } else  {
        
        console.log(signuserRef.current.value, signcnfpwdRef.current.value, signpwdref.current.value, signemailRef.current.value);
        const response = await axios.post('http://127.0.0.01:8000/register', {
          username: signuserRef.current.value,
          pwd: signcnfpwdRef.current.value,
          email: signemailRef.current.value,
          role:'user',
        })

        console.log(response.data)
        if (response.status == 409) alert("already registered Please login")
        if (response.status == 201) alert("Registered successfully")
       
      } 

    }
    else {
      alert("Please provide Entries")
    }

  }


  return (
    <div className='main-body'>
      
      <div className="main">
        {/* <input type="checkbox" id="#chk" aria-hidden="true" /> */}
        <div className="login">
          <form>
            <label htmlFor="#chk">Login</label>
            <input type="text" placeholder="Username" name="username" ref={loguserRef} />
            <input type="password" placeholder="Password" name="username" ref={logpwdref} />
            <input type="button" value="Login" onClick={handleLoginSubmit} />
          </form>
        </div>
        <div className="signup">
          <form>
            <label htmlFor="#chk">Signup</label>
            <input type="text" placeholder="Username" name="username" ref={signuserRef} />
            <input type="email" placeholder="Email" name="email" ref={signemailRef} />
            <input type="password" placeholder="Password" name="password" ref={signpwdref} onChange={ (e)=>setSignpwd(e.target.value)} />
            <input type="password" placeholder="Confirm password" name="cnfpwd" ref={signcnfpwdRef} onChange={ (e)=>setSigncnfpwd(e.target.value)} />
            <input type="button" value="Sing UP" onClick={handleSignSubmit} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;