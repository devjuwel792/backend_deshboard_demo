import React from 'react';

const ModalButton = ({ icon, text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="lg:px-5 md:px-4 sm:px-3 lg:py-2 md:py-1.5 sm:py-1 xl:text-base lg:text-base md:text-sm sm:text-sm bg-primary border-primary dark:hover:border-[#303038] text-white border dark:border-[#303038] dark:hover:text-white transition duration-300 hover:bg-white dark:hover:bg-[#303038]  hover:text-primary line-clamp-1"
        >
            {text}
        </button>
    );
};

export default ModalButton;