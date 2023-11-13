import React from "react";

const PlaylistVideosSkeleton = () => {
    const skeletonVideoCardStyles =
        "border-solid border-2 border-gray-200 bg-gray-200";

    return (
        <div className="flex p-4 h-full lg:flex-row xl:flex-row flex-col overflow-y-auto">
            <div className="lg:w-[35%] xl:w-[35%]">
                <div className="w-full p-4 shadow-lg bg-gray-400 rounded-lg overflow-x-auto h-full">
                    <div className="w-full rounded-lg h-40 bg-gray-300"></div>
                </div>
            </div>

            <div className="lg:w-2/3 xl:w-2/3 p-4 lg-overflow-y-auto xl-overflow-y-auto space-y-2">
                <h2 className="text-2xl font-semibold bg-gray-300 h-8">{""}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-4 lg-w-full xl-w-full md-w-full">
                    {Array.from({ length: 12 }, (_, index) => (
                        <div className={skeletonVideoCardStyles} key={index}>
                            <div className="bg-gray-300 rounded-lg p-2 shadow-md">
                                <div className="w-60 mx-auto h-40 bg-gray-300 rounded-lg"></div>
                                <p className="text-sm text-center font-semibold mt-2 bg-gray-300 h-6"></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistVideosSkeleton;
