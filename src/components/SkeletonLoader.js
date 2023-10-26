import React from "react";

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 h-screen overflow-y-auto">
            {Array.from({ length: 12 }, (_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 shadow-md rounded p-4 w-full"
                ></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
