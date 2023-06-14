import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";

import Details from "./Details";

const Experience = () => {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    return (
        <div className="my-32">
            <h2 className="font-bold text-8xl mb-32 w-full text-center">
                Experience
            </h2>

            <div
                ref={ref}
                className="w-[75%] mx-auto relative"
            >
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-9 top-1 w-[4px] bg-dark origin-top h-full"
                />
                <ul className="w-full flex flex-col items-start justify-between ml-4">
                    <Details
                        company="HypeScout Pte. Ltd."
                        position="Senior Software Engineer"
                        address="Singapore"
                        companyLink="https://www.hypescout.co"
                        time="Mar 2021 - Present"
                        work="Working on a social media marketing platform for the gaming industry."
                    />
                    <Details
                        company="Mainly Coding (Acq. by Shikho)"
                        position="Co-Founder & CTO"
                        address="Bangladesh"
                        companyLink="https://www.hypescout.co"
                        time="Sep 2017 - Jan 2022"
                        work="Working on a social media marketing platform for the gaming industry."
                    />
                    <Details
                        company="10 Minute School"
                        position="Intern"
                        address="Bangladesh"
                        companyLink="https://www.10minuteschool.com"
                        time="Apr 2018 - Sep 2018"
                        work="Working on a social media marketing platform for the gaming industry."
                    />
                </ul>
            </div>
        </div>
    );
}

export default Experience;
