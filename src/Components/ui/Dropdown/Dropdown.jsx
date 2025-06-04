'use client';

import Link from 'next/link';
import { useState } from 'react';

const Dropdown = ({ title, items }) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <button
                type="button"
                className="lg:px-5 md:px-4 sm:px-3 lg:py-2 md:py-1.5 sm:py-1 xl:text-base lg:text-base md:text-sm sm:text-sm hover:bg-primary text-primary border border-primary dark:border-[#303038] hover:text-white dark:text-white dark:bg-[#303038] transition duration-300 flex items-center gap-2"
            >
                {title}
                <svg
                    className="w-2.5 h-2.5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isVisible && (
                <div className="absolute z-10 w-64 bg-white dark:bg-lightBlack transition-all duration-400">
                    <h4 className="text-[17px] font-normal p-4 dark:text-white">Quick Links</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-200 grid grid-cols-2">
                        {items.map((item, index) => (
                            <li key={index} className="flex justify-center">
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-center px-4 py-4 border border-gray-200 dark:border-[#404040] w-full"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <span className="p-2 border border-gray-100 dark:border-[#eee] rounded-full">{item.icon}</span>
                                        <span className="text-[#2b2b2b] dark:text-[#DDDDDD] font-[13px] mt-1">{item.label}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Dropdown;