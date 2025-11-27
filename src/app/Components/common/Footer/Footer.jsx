import React from 'react';

const Footer = () => {
    return (
        <div className="p-1 flex justify-center items-center py-4 w-full bg-white dark:bg-darkGray">
            <p className="dark:text-[#fff] text-[#4a5568] text-sm text-center">
                Copyright © {new Date().getFullYear()}
                <span className="font-bold mx-1 text-primary">Dashboard.</span>
                All rights reserved.
            </p>
        </div>
    );
};

export default Footer;