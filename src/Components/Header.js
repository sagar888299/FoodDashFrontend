import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaShopify } from "react-icons/fa";
import { openModal } from "./ModalSlice";
import { logout } from "./AuthSilce";
import { resetState } from "../Store/Store";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(openModal("Login"));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
  };

  return (
    <header className="bg-white shadow-md fixed w-screen top-0 z-10 h-auto">
      <div className="sticky container mx-auto flex justify-between items-center p-2">
        <div className="text-purple-600 hover:text-purple-700 text-xl flex font-medium cursor-pointer">
          FoodDash
        </div>
        <nav className="flex items-center space-x-4 gap-4">
          <button className="text-purple-600 hover:text-purple-700 text-lg lg:block md:block sm:block hidden mb-2">
            <FaShopify size={36} />
          </button>
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="text-white bg-gradient-to-r mt-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-1 text-center mb-2"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <span className="inline-block bg-white text-black rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  S
                </span>
              </button>
              {showDropdown && (
                <div className="absolute lg:block md:block hidden top-full ml-2 right-0 bg-white shadow-md rounded mt-1 min-w-[120px]">
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Your Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mb-2"
              onClick={() => handleLogin()}
            >
              LogIn
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
