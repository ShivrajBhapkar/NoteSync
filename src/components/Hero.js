import React from "react";
import hero from "../assets/hero-illustration.png";
import { ReactComponent as Checkmark } from "../assets/checkmark.svg";
import { Section } from "../components/ui/Section";
import { NavBar } from "../components/NavBar";
import { ButtonLink } from "../components/ui/ButtonLink";
import tokenService from "../Services/token.service";
const Hero = () => {
    const user = tokenService.getUser();
    return (
        <Section as="header" className="bg-yellow-50">
            <NavBar />
            <div className="flex sm:flex-row flex-col-reverse items-center sm:my-10 -mt-16">
                <div className="sm:w-1/2 flex flex-col justify-center gap-4">
                    <h1 className="sm:text-5xl text-4xl font-semibold">
                        Elevate Your Learning with Timestamped Notes
                    </h1>
                    <p className="text-gray-500 sm:text-base text-lg">
                        Learning Reimagined: Timestamped Notes and Playlist
                        Control
                    </p>
                    <div className="flex sm:flex-row flex-col items-center sm:gap-8 gap-4 relative">
                        <ButtonLink
                            to={user !== null ? "/dashboard" : "/login"}
                            className="md:max-w-max w-full"
                            stretch
                        >
                            Go to dashboard
                        </ButtonLink>
                    </div>
                    <div className="flex sm:flex-row flex-col sm:items-center gap-4 sm:pb-0 pb-10">
                        <div className="flex gap-2">
                            <Checkmark />
                            <p className="text-gray-500">Track</p>
                        </div>
                        <div className="flex gap-2">
                            <Checkmark />
                            <p className="text-gray-500">Edit</p>
                        </div>
                        <div className="flex gap-2">
                            <Checkmark />
                            <p className="text-gray-500">Organize</p>
                        </div>
                    </div>
                </div>
                <img
                    className="sm:w-1/2 mb-8"
                    src={hero}
                    alt="Hero Illustration"
                />
            </div>
        </Section>
    );
};

export default Hero;
