import React, { memo } from "react";

const Logo = memo(() => {
    return (
        <div className="logo__container">
            <img src="/images/pullgo.png" alt="Logo" />
        </div>
    );
});

export default Logo;
