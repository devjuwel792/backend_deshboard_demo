import React from 'react';

const SearchInput = () => {
    return (
        <div className="w-full px-4">
            <form className="xl:min-w-[400px] mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>

                    <input
                        type="search"
                        id="default-search"
                        className="block w-full pl-[25px] pr-[30px] pt-[6px] pb-[6px] text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchInput;