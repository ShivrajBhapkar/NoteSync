import React, { useState } from "react";

import { Section } from "../components/ui/Section";

const Footer = () => {
  
    return (
        <Section as="footer" className="bg-yellow-50">
            <div
                id="footer"
                className="flex md:flex-row flex-col py-16 md:gap-4 gap-8"
            >
                <div className="md:w-2/5 flex flex-col gap-2">
                    <h3 className="sm:font-bold font-semibold sm:text-lg text-xl">
                        NoteSync
                    </h3>
                    <p className="text-gray-500 sm:text-base text-lg">
                        With NoteSync, Empower Your Learning Experience: Track,
                        Edit, and Organize with Ease
                    </p>
                    <p className="text-gray-500 mt-4 sm:text-base text-lg">
                        <>Made with ♥ in the India.</>
                    </p>
                </div>
                <div className="flex sm:flex-row flex-col md:w-3/5 sm:gap-0  justify-center">
                    <div className="lg:mr-8 md:mr-8 xl:mr-8 sm:mr-8 mr-0">
                        <h3 className="sm:font-bold font-semibold mb-2 sm:text-lg text-xl">
                            Sitemap
                        </h3>
                        <ul className="grid gap-2 text-gray-500 md:text-base text-lg">
                            <li>
                                <a className="hover:underline" href="#">
                                    Homepage
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline" href="#features">
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:ml-8 md:ml-8 xl:ml-8 sm:ml-8 ml-0">
                        <h3 className="sm:font-bold font-semibold mb-2 sm:text-lg text-xl">
                            Let's Connect
                        </h3>
                        <ul className="grid gap-2 text-gray-500 sm:text-base text-lg">
                            <li>
                                <a className="hover:underline" href="/#">
                                    Github
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline" href="/#">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline" href="/#">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline" href="/#">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                  
                </div>
            </div>
        </Section>
    );
};
export default Footer;
