import React from "react";

import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";

const LearningLanguageSection = () => {
    return (
        <div className="mt-[100px]">

            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center">
                    Your Swiss Knife for
                    <HighlightText text={" learning any language"} />
                </div>

                <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[80%]">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-col lg:flex-row mt-8 items-center justify-center">
                    <img
                        src={know_your_progress}
                        alt="knowYorProgress"
                        className="object-contain lg:-mr-32"
                    />
                    <img
                        src={compare_with_others}
                        alt="compareWithOthers"
                        className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                    />
                    <img
                        src={plan_your_lesson}
                        alt="planYourLessons"
                        className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
                    />
                </div>

                <div className="w-fit mb-7">
                    <CTAButton active={true} linkto={"/login"}>
                        <div>Learn More</div>
                    </CTAButton>
                </div>
            </div>

        </div>
    )
}

export default LearningLanguageSection;