import React, { useMemo, useState } from "react";
import { findPrime } from "../utils/helper";

const Demo = () => {
    const [text, setText] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // See the problem over here is if we type some number in input box it will give us prime number of that number it was expensive operation and if we click on toggle button it will call that prime function in every render in though we don't required that becz we already calculated the value of prime number that's why we can see if enter 6 digit number in input box it will give us prime number but if we click toggle button after that it will layg that's becz its calling that prime function again nad again even though we don't need it hence here we can use useMemo hook here to store the value of prime number between re-renders
    // const prime = () => {
    //     console.log("Calculate Prime NUmber of", text);

    //     return findPrime(text);
    // };

    //  Here we are using useMemo hook. useMemo hook has two values one is value you want to memorize and second one is dependency means here we are memorizing the prime number our text changes means until did not enter new number.Here by using this hook our prime operation still take time but won't affect or lag other operations
    const prime = useMemo(() => findPrime(text), [text]);

    return (
        <div
            className={
                "m-4 p-2 w-96 h-96 border border-black " +
                (isDarkTheme && "bg-gray-900 text-white")
            }
        >
            <div>
                <div>
                    <button
                        className="m-10 p-2 bg-green-200"
                        onClick={() => setIsDarkTheme(!isDarkTheme)}
                    >
                        Toggle
                    </button>
                </div>
                <input
                    className="border border-black w-72 px-2 "
                    type="number"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </div>
            <div>
                <h1 className="mt-4 font-bold text-xl">Nth Prime:{prime}</h1>
            </div>
        </div>
    );
};

export default Demo;
