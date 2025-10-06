import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";

import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { VscDashboard, VscSignOut } from "react-icons/vsc";


import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { logout } from "../../services/operations/authAPI";


const NavBar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [subLinks, setSubLinks] = useState([]);
    const [showCatalog, setShowCatalog] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing Sublinks result: ", result);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("Could not fetch the category list", error);
        }
    }

    useEffect( () => {
        fetchSublinks();
    }, []);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

    return (
        <div 
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 
        ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>

            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="logo" width={160} height={32} loading="lazy"/>
                </Link>

                {/* Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                        className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") 
                                        ? "text-yellow-25" 
                                        : "text-richblack-25"}`}>

                                            <p>{link.title}</p>
                                            <FaAngleDown/>

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[150px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[200px] max-h-[450px] overflow-y-auto">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                
                                                {subLinks?.map( (subLink, i) => {
                                                    return (
                                                        <Link className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                        to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={i}>
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard */}
                <div className="hidden items-center gap-x-4 md:flex">
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <FaCartShopping className="text-2xl text-richblack-100" />
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"> Login </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"> Sign Up </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>

                <button className="mr-4 md:hidden"
                onClick={() => setIsOpenMenu((prev) => !prev)}> 
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>

                {isOpenMenu && (
                <div className="absolute top-16 right-4 z-[1000] flex flex-col w-56 rounded-lg bg-richblack-800 text-richblack-25 shadow-lg border border-richblack-700 md:hidden max-h-[80vh] overflow-y-auto">

                    {/* Navbar Links for mobile */}
                    {NavbarLinks.map((link, index) => (
                    <div key={index} className="flex flex-col">
                        {link.title === "Catalog" ? (
                        <>
                            {/* Catalog header */}
                            <div
                            onClick={() => setShowCatalog((prev) => !prev)}
                            className="flex items-center justify-between gap-2 px-4 py-2 font-semibold bg-richblack-900 border-t border-richblack-700 cursor-pointer hover:text-yellow-25 transition-all"
                            >
                            <span>{link.title}</span>
                            <FaAngleDown
                                className={`text-yellow-50 transition-transform duration-300 ${
                                showCatalog ? "rotate-180" : "rotate-0"
                                }`}
                            />
                            </div>

                            {/* Dropdown (animated) */}
                            <div
                            className={`overflow-hidden transition-all duration-300 ease-out bg-richblack-900 ${
                                showCatalog
                                ? "max-h-[400px] opacity-100 translate-y-0"
                                : "max-h-0 opacity-0 -translate-y-2"
                            }`}
                            >
                            {subLinks?.map((subLink, i) => (
                                <Link
                                key={i}
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                onClick={() => {
                                    setIsOpenMenu(false);
                                    setShowCatalog(false);
                                }}
                                className="block px-8 py-2 text-sm hover:bg-richblack-700 transition-all"
                                >
                                {subLink.name}
                                </Link>
                            ))}
                            </div>
                        </>
                        ) : (
                        <Link
                            to={link?.path}
                            onClick={() => setIsOpenMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700 transition-all"
                        >
                            <span>{link.title}</span>
                        </Link>
                        )}
                    </div>
                    ))}

                {/* Auth / Dashboard options */}
                {!user ? (
                    <>
                        <Link
                        to="/login"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700 transition-all border-t border-richblack-700"
                        >
                        <FiLogIn className="text-yellow-50" />
                        <span>Login</span>
                        </Link>

                        <Link
                        to="/signup"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700 transition-all"
                        >
                        <FaUserPlus className="text-yellow-50" />
                        <span>Signup</span>
                        </Link>
                    </>
                    ) : (
                    <>
                        {/* Dashboard Link */}
                        <Link
                        to="/dashboard/my-profile"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700 transition-all border-t border-richblack-700"
                        >
                        <VscDashboard className="text-yellow-50 text-lg" />
                        <span>Dashboard</span>
                        </Link>

                        {/* Logout Link */}
                        <button
                        onClick={() => {
                            dispatch(logout(navigate)); // same as desktop
                            setIsOpenMenu(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-richblack-700 transition-all text-left"
                        >
                        <VscSignOut className="text-yellow-50 text-lg" />
                        <span>Logout</span>
                        </button>
                    </>
                    )}
                </div>
                )}

            </div>

        </div>
    )
}

export default NavBar;
