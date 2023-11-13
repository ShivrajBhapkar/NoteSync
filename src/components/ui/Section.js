import React from "react";
export const Section = ({
    className = "",
    as: Wrapper = "div",
    children,
    style,
}) => {
    return (
        <Wrapper className={className} style={style}>
            <div className="container max-w-screen-lg mx-auto xl:px-0 px-10 overflow-hidden">
                {children}
            </div>
        </Wrapper>
    );
};
