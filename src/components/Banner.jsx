import React, { memo } from "react";
import { useMediaQuery } from "react-responsive";

const Banner = memo(() => {
    const isPC = useMediaQuery({
        query: "(min-width: 1024px)"
    });

    return (
        <>
            {isPC && (
                <div className="banner__container">
                    <h1>Firstian Project</h1>
                    <span>학원 온라인 환경 지원</span>
                </div>
            )}
        </>
    );
});

export default Banner;
