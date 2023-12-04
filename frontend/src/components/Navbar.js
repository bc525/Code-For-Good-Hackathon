import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { AdminConsole } from "../admin/AdminConsole";
import { VolLandingPage } from "../volunteer/VolLandingPage";

function NavBar({ currentPage }) {
  const [isHamburgerNavBarOpen, setIsHamburgerNavBarOpen] = useState(false);
  const [isMedScreen, setIsMedScreen] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user !== null);

  useEffect(() => {
    function checkScreenSize() {
      setIsMedScreen(window.innerWidth >= 768);
    }

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  function toggleHamburgerNavBar() {
    setIsHamburgerNavBarOpen(!isHamburgerNavBarOpen);
  }

  return (
    <nav>
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <img
              src={require("../assets/logo.jpeg")}
              className="w-[150px] h-auto"
            />
          </span>
        </Link>
        {!isMedScreen && (
          <div>
            <button
              onClick={toggleHamburgerNavBar}
              type="button"
              className="inline-flex items-center justify-end p-2 mb-0.5 text-sm text-text.black rounded-lg hover:text-rta.darkGreen"
            >
              <span className="sr-only">Open navigation bar</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`bg-black fixed inset-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform duration-700 ${
                isHamburgerNavBarOpen
                  ? "translate-x-0 bg-bg.offWhite w-screen"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={toggleHamburgerNavBar}
                type="button"
                className="inline-flex items-center text-bg.offWhite hover:text-rta.green rounded-lg text-sm p-2 absolute top-3.5 right-3.5 focus:outline-none"
              >
                <div>
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="sr-only">Close menu</span>
              </button>
              <div className="py-4 overflow-y-auto m-2 mt-1/3">
                <div className="flex flex-col items-center justify-center space-y-8 font-semibold text-2xl text-bg.offWhite">
                  <Link
                    to="/"
                    className={`hover:text-rta.green hover:cursor-pointer ${
                      currentPage === "Home" ? "underline" : ""
                    }`}
                  >
                    My Profile
                  </Link>
                  {user && user.isAdmin && (
                    <Link
                      to="/admin"
                      className={`hover:text-rta.green hover:cursor-pointer ${
                        currentPage === "Admin" ? "underline" : ""
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {user && !user.isAdmin && (
                    <Link
                      to="/volunteer"
                      className={`hover:text-rta.green hover:cursor-pointer ${
                        currentPage === "Volunteer" ? "underline" : ""
                      }`}
                    >
                      Volunteer Dashboard
                    </Link>
                  )}

                  <Link
                    to="/homeowners-application"
                    className={`hover:text-rta.green hover:cursor-pointer ${
                      currentPage === "HomeownersApplication" ? "underline" : ""
                    }`}
                  >
                    Homeowners Application
                  </Link>
                  {user && (
                    <Link
                      to="/logout"
                      className="hover:text-rta.green hover:cursor-pointer rounded-full border border-black p-2 "
                    >
                      Logout
                    </Link>
                  )}
                  {!user && (
                    <>
                      <Link
                        to="/login"
                        className={`hover:text-rta.green hover:cursor-pointer ${
                          currentPage === "Login" ? "underline" : ""
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className={`hover:text-rta.green hover:cursor-pointer ${
                          currentPage === "Signup" ? "underline" : ""
                        }`}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {isMedScreen && (
          <div className="">
            <button
              onClick={toggleHamburgerNavBar}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-rta.green rounded-lg md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`w-full md:block md:w-auto ${
                !isHamburgerNavBarOpen ? "hidden" : ""
              }`}
            >
              <ul
                className={`font-medium text-xl flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0`}
              >
                {user && user.isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                        currentPage === "Admin" ? "underline" : ""
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                {user && !user.isAdmin && (
                  <li>
                    <Link
                      to="/volunteer"
                      className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                        currentPage === "Volunteer" ? "underline" : ""
                      }`}
                    >
                      Volunteer Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/"
                    className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                      currentPage === "Home" ? "underline" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/homeowners-application"
                    className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                      currentPage === "HomeownersApplication" ? "underline" : ""
                    }`}
                  >
                    Homeowners Application
                  </Link>
                </li>
                {user && (
                  <Link
                    to="/logout"
                    className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer`}
                  >
                    Logout
                  </Link>
                )}
                {!user && (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                          currentPage === "Login" ? "underline" : ""
                        }`}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className={`block py-2 pl-3 pr-4 rounded hover:text-rta.green hover:cursor-pointer ${
                          currentPage === "Signup" ? "underline" : ""
                        }`}
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
