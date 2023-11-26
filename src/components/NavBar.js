import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ui/ButtonLink";
import tokenService from "../Services/token.service";
import { ReactComponent as HamburgerMenu } from "../assets/hamburger-menu.svg";
export const NavBar = ({ className }) => {
    const [dropdownIsShown, setDropdownIsShown] = useState(false);
    const toggleDropdown = () => setDropdownIsShown(!dropdownIsShown);
    const user = tokenService.getUser();
    document.body.className = dropdownIsShown
        ? "overflow-hidden"
        : "overflow-auto";

    return (
        <>
            <nav
                className={`flex justify-between w-full mb-4 py-8 items-center relative ${className}`}
            >
                <Link to="/">
                    <h3 className="sm:font-bold font-semibold sm:text-lg text-xl">
                        NoteSync
                    </h3>
                </Link>
                <ul className="md:flex hidden gap-4 items-center text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <li>
                        <Link
                            to="/#footer" // Use the appropriate path and anchor link
                            className="hover:underline"
                            onClick={() => {
                                toggleDropdown();
                                // Scroll to the footer section
                                const footerElement =
                                    document.getElementById("footer");
                                if (footerElement) {
                                    footerElement.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                        >
                            Connect
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/#features" // Use the appropriate path and anchor link
                            className="hover:underline"
                            onClick={() => {
                                toggleDropdown();
                                // Scroll to the footer section
                                const footerElement =
                                    document.getElementById("features");
                                if (footerElement) {
                                    footerElement.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                        >
                            Features
                        </Link>
                    </li>
                </ul>
                {!user ? (
                    <div className="md:flex hidden items-center gap-8">
                        <Link to="/login">
                            <h3 className="font-bold text-lg hover:underline">
                                Sign In
                            </h3>
                        </Link>
                        <ButtonLink to="/register">Sign Up</ButtonLink>
                    </div>
                ) : null}
                <div className="md:hidden">
                    <HamburgerMenu
                        onClick={toggleDropdown}
                        className="cursor-pointer"
                    />
                </div>
            </nav>
            {dropdownIsShown && (
                <div className="h-screen w-full">
                    <ul className="flex flex-col gap-2 text-lg">
                        <li>
                            <Link
                                to="/#features" // Use the appropriate path and anchor link
                                className="hover:underline"
                                onClick={() => {
                                    toggleDropdown();
                                    // Scroll to the footer section
                                    const footerElement =
                                        document.getElementById("features");
                                    if (footerElement) {
                                        footerElement.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                Features
                            </Link>
                            {/* <a
                                className="hover:underline"
                                href="/#features"
                                onClick={toggleDropdown}
                            >
                                Features
                            </a> */}
                        </li>
                        <li>
                            <Link
                                to="/#footer" // Use the appropriate path and anchor link
                                className="hover:underline"
                                onClick={() => {
                                    toggleDropdown();
                                    // Scroll to the footer section
                                    const footerElement =
                                        document.getElementById("footer");
                                    if (footerElement) {
                                        footerElement.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                Connect
                            </Link>
                        </li>
                    </ul>
                    {!user ? (
                        <div className="flex justify-between items-center gap-8 fixed bottom-10 right-10">
                            <Link to="/sign-up">
                                <h3 className="font-bold text-lg hover:underline">
                                    Sign In
                                </h3>
                            </Link>
                            <ButtonLink to="/sign-up">Sign Up</ButtonLink>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
};
