import React from 'react';

const OutlineButton = ({ icon, text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="lg:px-5 md:px-4 sm:px-3 lg:py-2 md:py-1.5 sm:py-1 xl:text-base lg:text-base md:text-sm sm:text-sm hover:bg-primary text-primary border border-primary dark:border-[#303038] hover:text-white dark:text-white dark:bg-[#303038] transition duration-300 flex items-center gap-2 justify-between"
        >
            {text}
            {icon && <span>{icon}</span>}
        </button>
    );
};

export default OutlineButton;