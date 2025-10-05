import React from "react";
import {FaArrowRight} from "react-icons/fa6";
import { Link } from "react-router-dom";


import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from  "../components/core/HomePage/ReviewSlider";

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className="relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between">
                
                {/* Become a Instructor Button */}
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className="mt-7 text-center text-4xl font-semibold">
                    Empower Your Future With
                    <HighlightText text={"Coding Skills"}/>
                </div>

                {/* Subheading */}
                <div className="mt-4 w-[90%] text-center text-lg font-medium text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-7 mt-8">

                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>

                </div>

                {/* Video */}
                <div className="relative mx-auto my-7 w-[90%] max-w-[18rem] md:max-w-[43.59rem] shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-sm overflow-hidden">
                    <video className="w-full h-auto object-cover shadow-[20px_20px_rgba(255,255,255)]"
                    muted
                    loop
                    autoPlay>
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>

                {/* Code Section 1  */}
                <div className="pt-14">
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your 
                                <HighlightText text={"coding potential "} /> 
                                with our online courses.
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={{
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="absolute top-[-20px] left-[-80px] w-[372.95px] h-[257.05px] rounded-full bg-[linear-gradient(123.77deg,rgba(138,43,226,1)_-6.46%,rgba(255,165,0,1)_59.04%,rgba(248,248,255,1)_124.53%)] shadow-md opacity-20 blur-3xl"></div>}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* Code Section 2 */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start  
                                <HighlightText text={"coding in seconds."} /> 
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="absolute top-[-20px] left-[-20px] w-[372.95px] h-[257.05px] rounded-full bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] shadow-md opacity-20 blur-3xl"></div>}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* Explore All Section */}
                <ExploreMore />

            </div>


            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">

                <div className="homepage_bg h-[333px] mt-14">

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">

                        <div className="h-[150px]"></div>

                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex flex-row gap-3 items-center">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>

                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                    
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="font-semibold text-4xl lg:w-[45%]">
                            Get the skills you need for a <HighlightText text={"job that is in demand."} />
                        </div>

                        <div className="flex flex-col items-start gap-10 lg:w-[45%]">
                            <div className="text-[16px]">
                                The modern EdTech is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"signup"}>
                                <div >
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningLanguageSection />

                </div>
                

            </div>


            {/* Section 3 */}
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Become a instructor section */}
                <InstructorSection />

                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>

                <ReviewSlider />

            </div>


            {/* Footer */}
            <Footer />

        </div>
    )
}

export default Home
