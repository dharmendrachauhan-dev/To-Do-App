import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { useEffect } from 'react'


function Login() {

  const [userData, setUserData] = useState({email: "", password: ""})
  const navigate = useNavigate()

  //jab tak user login hai tab tak use login pe nhi jaane dena hai uske liye uske email ko local storage mei rkha hai

  useEffect(()=>{
    if (localStorage.getItem('login')){
      navigate('/')
    }
  }, [])



  const handleLogin = async () => {
    let response = await fetch('http://localhost:8000/login', {
      method:'post',
      body:JSON.stringify(userData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    let result = await response.json();
    if(result.success){
      document.cookie=`token=${result.token}`  // space between = sign while set up token 
      localStorage.setItem('login', userData.email)
      window.dispatchEvent(new Event('loacalStorage-change'))
      navigate('/')
    }else {
      alert('Wrong Email Or Password')
    }
  }

  return (
    <>
     <div className="p-7 max-h-screen flex flex-col items-center justify-center">
          <div className="border border-slate-400 shadow-slate-300 w-lg p-8 flex flex-col gap-4 rounded">
            <h1 className="text-center font-bold tracking-wider text-2xl text-gray-700">LogIn</h1>
            <p className="text-lg text-center">Create new account <Link to="/signup" className="text-blue-600 underline font-semibold">SignUp</Link></p>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xl text-slate-800">Email</label>
              <input
                type="email"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter email"
                onChange={(event)=>setUserData((prev)=>({...prev, email:event.target.value}))}
                required
                value={userData.email}
                autoComplete='off'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-xl text-slate-800">Password</label>
              <input
                type="password"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                required
                placeholder="Enter Password"
                onChange={(event)=>setUserData((prev)=>({...prev, password:event.target.value}))}   
                value={userData.password}  
                autoComplete='off'     
              />
            </div>
            <button 
            className="bg-green-300 w-full cursor-pointer py-2 rounded font-medium text-white"
            onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
    </>
  )
}

export default Login
