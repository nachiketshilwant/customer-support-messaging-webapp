import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Header = (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    props.setUser()
    navigate("/");
  };
  return (
    <header className="header flex justify-between items-center p-8 mb-16 ">
      <div className="logo">
        <Link to="/">Customer Support</Link>
      </div>
      <ul className="flex justify-between items-center ">
        {props.user ? (
          <li className=" ml-5 ">
            <button className="btn flex items-center bg-[#000] px-8 py-1 text-white " onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li className=" ml-5 ">
              <Link to="/login" className=" flex items-center hover:text-slate-600 ">
                <FaSignInAlt className=" ml-1 " /> Login
              </Link>
            </li>
            <li className=" ml-5 " >
              <Link to="/register" className="flex items-center " >
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
