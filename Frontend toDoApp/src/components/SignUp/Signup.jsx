import { Link } from 'react-router-dom';
import { useState } from 'react';

function signup() {

  const [userData, setUserData] = useState()

  const handleSignUp = async () => {
    let response = await fetch('http://localhost:8000/signup',{
      method: postMessage,
      body:JSON.stringify(userData),
      header:{
        'content-Type':'application/json'
      }
    })

    result = await response.json()
  }

  return (
    <>
        <div className="p-7 max-h-screen flex flex-col items-center justify-center">
          <div className="border border-slate-400 shadow-slate-300 w-lg p-8 flex flex-col gap-4 rounded">
            <h1 className="text-center font-bold tracking-wider text-2xl text-gray-700">Sign Up</h1>
            <p className="text-lg text-center">Already a member? <Link to="/login" className="text-blue-600 underline font-semibold">login</Link></p>
            <div className="flex flex-col ">
              <label htmlFor="title" className="text-stone-800 text-xl">Name</label>
              <input
                type="text"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter name"
                required
                onChange={(event)=> setUserData((prev) => ({...prev, name:event.target.value}))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xl text-slate-800">Email</label>
              <input
                type="email"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter email"
                required
                onChange={(event) => setUserData((prev)=>({...prev, email:event.target.value}))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-xl text-slate-800">Password</label>
              <input
                type="password"
                className="border-2 border-slate-400 rounded px-2 py-2 focus:border-emerald-500 outline-none"
                placeholder="Enter Password"
                required
                onChange={(event)=> setUserData((prev) => ({...prev, password:event.target.value}))}
              />
            </div>
            <button 
            className="bg-green-300 w-full cursor-pointer py-2 rounded font-medium text-white"
            onClick={handleSignUp}
            >
              Create Account
            </button>
          </div>
        </div>
    </>
  );
}

export default signup;
