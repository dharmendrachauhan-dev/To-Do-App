import { useEffect, useState } from "react";
import { NavLink , Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [login, setLogin] = useState(localStorage.getItem('login'))

  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem('login')
    setLogin(null)
    setTimeout(() => {
      navigate('/login')
    }, 0);
  }

  useEffect(()=>{
    const handleStorage = () => {
      setLogin(localStorage.getItem('login'))
    }

    window.addEventListener('loacalStorage-change', handleStorage)
    return () => {
      window.removeEventListener('loacalStorage-change', handleStorage)
    }
  },[])

  return (
    <>
      <nav className="bg-gray-900 shadow-lg text-white">
        <div className="flex justify-between h-17 max-w-7xl mx-auto p-4 ">
          <div className="text-xl">
           <Link to='/'>To Do App</Link>
          </div>
          <div>
            <ul className="flex gap-5 justify-center items-center">   
              
              {
                login ?
                <>
                <NavLink
                to="/"
                className={({isActive}) => isActive ? "text-orange-300 text-lg" : "text-white"}
              >
               List
              </NavLink>
              <NavLink
              to="/add"
              className={({isActive}) => isActive ? "text-orange-300 text-lg" : "text-white"}
              >
                Add Task
              </NavLink>

              <NavLink
              onClick={Logout}
              className={({isActive}) => isActive ? "text-white bg-purple-500 px-4 py-2 font-semibold tracking-wider rounded duration-400 hover:bg-purple-600" : "text-white bg-purple-500 px-4 py-2 font-semibold tracking-wider rounded duration-400 hover:bg-purple-600"}
              >
                Logout
              </NavLink>
                </>:null
              } 

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
