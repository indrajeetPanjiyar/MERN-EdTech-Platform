import React, { useState } from "react";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Tab from "../../common/Tab";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE} from "../../../utils/constants";
import countrycode from "../../../data/countrycode.json";

const SignupForm = () => {

    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const selectedCountry = countrycode.find((c) => c.code === countryCode);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {firstName, lastName, email, password, confirmPassword} = formData;

    // Handle input fields, when some value changes
    const handleOnChange = (event) => {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value
        }));
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords Do Not Match");
            return;
        }
        const signupData = {...formData, accountType};

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData));
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));

        setFormData({
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }


    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: "Student",
        },
        {
            id: 2,
            tabName: "Instructor",
            type: "Instructor",
        },
    ]

    return (
        <div>
            {/* Tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input required
                               type="text"
                               name="firstName"
                               value={firstName}
                               onChange={handleOnChange}
                               placeholder="Enter First Name"
                               style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                               }}
                               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    <lable>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input required
                               type="text"
                               name="lastName"
                               value={lastName}
                               placeholder="Enter Last Name"
                               onChange={handleOnChange}
                               style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                               }}
                               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </lable>
                </div>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input required
                           type="text"
                           name="email"
                           value={email}
                           placeholder="Enter email address"
                           onChange={handleOnChange}
                           style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                           }}
                           className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>

                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Phone Number
                    </p>
                    <div className="flex gap-x-3 w-full relative">
                        <button type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-[20%] rounded-[0.5rem] bg-richblack-800 p-[12px] flex items-center justify-between text-richblack-5"
                        >{selectedCountry?.code}
                            <svg
                                className="ml-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isOpen && (
                            <ul className="absolute top-[110%] left-0 w-[30%] max-h-40 overflow-y-auto rounded-[0.5rem] bg-richblack-800 text-richblack-5 shadow-lg z-10">
                                {countrycode.map((country) => (
                                    <li key={country.code}
                                        onClick={ () => {
                                            setCountryCode(country.code)
                                            setIsOpen(false)
                                        }}
                                        className="cursor-pointer px-3 py-2 hover:bg-richblack-700">
                                        {country.code} ({country.country})
                                    </li>
                                ))}
                            </ul>
                        )}

                        <input
                               type="tel"
                               name="phone"
                               value={phone}
                               placeholder="Enter Phone Number"
                               onChange={(e) => setPhone(e.target.value)}
                               style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                               }}
                               className="w-[75%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        
                    </div>
                </label>

                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm;