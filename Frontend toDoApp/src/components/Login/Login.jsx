import { Link } from 'react-router-dom'
import {useState} from 'react'


function Signin() {

  const [userData, setUserData] = useState({email: "", password: ""})

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
            onClick={() => console.log(userData)}
            >
              Login
            </button>
          </div>
        </div>
    </>
  )
}

export default Signin
