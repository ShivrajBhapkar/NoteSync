import React from "react";

const NoteTakingAppSkeleton = () => {
    return (
        <div className="flex lg:h-full md:h-full xl:h-full max-h-screen flex-col lg:flex-row xl:flex-row sm:overflow-y-auto lg:overflow-y-hidden xl:overflow-y-hidden overflow-y-auto">
            <div className="flex-[60%]">
                <div className="w-full p-2 shadow-lg">
                    <div className="h-96 bg-gray-300 animate-pulse rounded-md"></div>
                </div>
            </div>
            <div className="flex-[40%] p-4 h-screen md::overflow-y-auto lg:overflow-y-auto xl:overflow-y-auto">
                <div className=" p-2 rounded-lg shadow-sm border-2 border-solid border-gray-300">
                    {/* Video Information Skeleton */}
                    <div className="h-5 w-4/5 bg-gray-300 animate-pulse mb-2 rounded-md"></div>
                    <div className="h-20 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-5 bg-gray-300 animate-pulse rounded-md"></div>
                </div>
                <div>
                    {/* Notes List Skeleton */}
                    <div className="h-5 w-2/5 bg-gray-300 animate-pulse mb-2 rounded-md"></div>
                    <div className="h-28 bg-gray-300 animate-pulse mb-2 rounded-md"></div>
                    <div className="h-5 bg-gray-300 animate-pulse rounded-md"></div>
                    {/* You can repeat the above skeleton placeholders for as many notes as needed */}
                </div>
            </div>
        </div>
    );
};

export default NoteTakingAppSkeleton;
