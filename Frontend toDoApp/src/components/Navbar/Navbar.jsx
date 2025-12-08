import React from "react";
import { NavLink , Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="bg-gray-900 shadow-lg text-white">
        <div className="flex justify-between h-17 max-w-7xl m-auto p-4 ">
          <div className="text-xl">
           <Link to='/'>To Do App</Link>
          </div>
          <div>
            <ul className="flex gap-5">
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
