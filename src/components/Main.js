import React from "react";

import page from "../assets/homescreen.png";
import { ReactComponent as Time } from "../assets/time.svg";
import { ReactComponent as Code } from "../assets/code.svg";
import { ReactComponent as AllSizes } from "../assets/allSizes.svg";

import { Section } from "../components/ui/Section";
import { ButtonLink } from "../components/ui/ButtonLink";
// import { TestimonialCard } from "../TestimonialCard";

// import testimonials from "../../data/testimonials.json";

 const Main = () => (
     <Section as="main">
         <div id="features" className="py-8">
             <div className="sm:w-1/2 flex flex-col gap-4 my-8">
                 <p className="text-indigo-600 font-semibold">Why NoteSync</p>
                 <h2 className="sm:text-3xl text-4xl sm:font-bold font-semibold">
                     Edit and Personalize Your Learning Notes
                 </h2>
             </div>
             <div className="flex sm:flex-row flex-col w-full gap-10 my-8">
                 <div className="flex-1 flex flex-col gap-4">
                     <Time />
                     <h4 className="text-sm font-bold">Time Savings</h4>
                     <p className="text-gray-500 sm:text-base text-lg">
                         Writing notes by hand not only requires a substantial
                         amount of time but also leaves room for error. With our
                         app, you save time, eliminate the need for rewriting,
                         and ensure the accuracy of your notes.
                     </p>
                 </div>
                 <div className="flex-1 flex flex-col gap-4">
                     <Code />
                     <h4 className="text-sm font-bold">Effortless Editing</h4>
                     <p className="text-gray-500 sm:text-base text-lg">
                         Unlike traditional paper notes, our digital notes are
                         editable. Made a mistake or want to refine your
                         understanding? No problem. You can easily edit your
                         notes to perfection, giving you complete control over
                         your learning material.
                     </p>
                 </div>
                 <div className="flex-1 flex flex-col gap-4">
                     <AllSizes />
                     <h4 className="text-sm font-bold">Timestamped Notes</h4>
                     <p className="text-gray-500 sm:text-base text-lg">
                         Ever wished you could make notes at precisely the
                         moment in a video when a crucial concept is explained?
                         Now you can. Our application allows you to create
                         timestamped notes, ensuring you capture important
                         information without the need for constant pausing and
                         rewinding.
                     </p>
                 </div>
             </div>
         </div>

         <div
             id="pricing"
             className="flex sm:flex-row flex-col bg-indigo-600 rounded-md mb-8"
         >
             <div className="flex flex-col gap-4 sm:w-5/12 px-8 self-center py-10">
                 <h2 className="sm:text-3xl text-4xl text-white sm:font-bold font-semibold">
                     Accessibility
                 </h2>
                 <p className="text-gray-200 sm:text-base text-lg">
                     Access your notes from anywhere, on any device. No need to
                     carry around heavy notebooks; your learning materials are
                     at your fingertips.
                 </p>
                 <ButtonLink
                     color="secondary"
                     to="/sign-up"
                     className="sm:max-w-max"
                     stretch
                 >
                     Start
                 </ButtonLink>
             </div>
             <img
                 className="sm:w-7/12 sm:pt-8 sm:pr-8 px-8 object-cover"
                 src={page}
                 alt="Case studies page preview."
             />
         </div>
     </Section>
 );
export default Main;