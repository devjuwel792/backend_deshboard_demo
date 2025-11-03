import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import {
    LayoutDashboard,
    Settings,
    Wallet,
    LogOut
} from 'lucide-react';
import Dropdown from "@/Components/ui/Dropdown/Dropdown";
import HoverOutlineButton from "@/Components/ui/HoverOutlineButton/HoverOutlineButton";
import SearchInput from "@/Components/ui/SearchInput/SearchInput";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/Helper/Redux/features/sidebar/sidebarSlice';
import { toggleTheme } from '@/Helper/Redux/features/theme/themeSlice';
import { useTranslation } from 'react-i18next';

const items = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
    { label: 'Earnings', href: '/earnings', icon: <Wallet size={16} /> },
    { label: 'Sign out', href: '/signout', icon: <LogOut size={16} /> }
];

const Navbar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    // const handleToggleSidebar = () => dispatch(toggleSidebar());
    const handleLanguageChange = () => {
        const newLang = i18n.language === 'en' ? 'bn' : 'en';
        i18n.changeLanguage(newLang);
    };
    const handleThemeToggle = () => dispatch(toggleTheme());
    // console.log("toggleSidebar", toggleSidebar)
    return (
        <div className="sticky top-0 z-10 flex items-center justify-between xl:p-[30px] lg:p-[26px] md:p-[22px] p-4 bg-white dark:bg-darkGray">


            {/* <div className="flex items-center"> */}

            <div className="flex items-center">
                {/* sidebar toggle button */}
                <button className='cursor-pointer p-2 hover:bg-[#334155] block xl:hidden lg:hidden' onClick={toggleSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        width="1.5em"
                        height="1.5em"
                    >
                        <path d="M6.75 2.5C9.09721 2.5 11 4.40279 11 6.75V11H6.75C4.40279 11 2.5 9.09721 2.5 6.75C2.5 4.40279 4.40279 2.5 6.75 2.5ZM9 9V6.75C9 5.50736 7.99264 4.5 6.75 4.5C5.50736 4.5 4.5 5.50736 4.5 6.75C4.5 7.99264 5.50736 9 6.75 9H9ZM6.75 13H11V17.25C11 19.5972 9.09721 21.5 6.75 21.5C4.40279 21.5 2.5 19.5972 2.5 17.25C2.5 14.9028 4.40279 13 6.75 13ZM6.75 15C5.50736 15 4.5 16.0074 4.5 17.25C4.5 18.4926 5.50736 19.5 6.75 19.5C7.99264 19.5 9 18.4926 9 17.25V15H6.75ZM17.25 2.5C19.5972 2.5 21.5 4.40279 21.5 6.75C21.5 9.09721 19.5972 11 17.25 11H13V6.75C13 4.40279 14.9028 2.5 17.25 2.5ZM17.25 9C18.4926 9 19.5 7.99264 19.5 6.75C19.5 5.50736 18.4926 4.5 17.25 4.5C16.0074 4.5 15 5.50736 15 6.75V9H17.25ZM13 13H17.25C19.5972 13 21.5 14.9028 21.5 17.25C21.5 19.5972 19.5972 21.5 17.25 21.5C14.9028 21.5 13 19.5972 13 17.25V13ZM15 15V17.25C15 18.4926 16.0074 19.5 17.25 19.5C18.4926 19.5 19.5 18.4926 19.5 17.25C19.5 16.0074 18.4926 15 17.25 15H15Z" />
                    </svg>
                </button>
                {/* logo */}
                <div className="xl:hidden lg:hidden md:block sm:block">
                    <h1 className="dark:text-primary text-black xl:text-2xl lg:text-xl md:text-lg text-base font-semibold">Dashboard</h1>
                </div>

                {/* Search input */}
                <div className="z-1 xl:block lg:block md:block sm: hidden">
                    <SearchInput />
                </div>
            </div>


            <div>
                {/* Buttons */}
                <div className="flex items-center xl:gap-6 lg:gap-4 md:gap-2 gap-1 justify-end w-full">
                    <div className="xl:block lg:block md:hidden sm:hidden hidden">
                        <div className="flex gap-4">
                            <Dropdown title="Quick Links" items={items} />
                            <HoverOutlineButton text="POS" />
                        </div>
                    </div>

                    {/* Language Toggle Button */}
                    <div className="cursor-pointer flex" onClick={handleLanguageChange}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5 10L22.9 21H20.745L19.544 18H15.454L14.255 21H12.101L16.5 10H18.5ZM10 2V4H16V6L14.0322 6.0006C13.2425 8.36616 11.9988 10.5057 10.4115 12.301C11.1344 12.9457 11.917 13.5176 12.7475 14.0079L11.9969 15.8855C10.9237 15.2781 9.91944 14.5524 8.99961 13.7249C7.21403 15.332 5.10914 16.5553 2.79891 17.2734L2.26257 15.3442C4.2385 14.7203 6.04543 13.6737 7.59042 12.3021C6.46277 11.0281 5.50873 9.57985 4.76742 8.00028L7.00684 8.00037C7.57018 9.03885 8.23979 10.0033 8.99967 10.877C10.2283 9.46508 11.2205 7.81616 11.9095 6.00101L2 6V4H8V2H10ZM17.5 12.8852L16.253 16H18.745L17.5 12.8852Z"></path>
                        </svg>
                        <span className="ml-1 text-sm">{i18n.language === 'en' ? 'EN' : 'BN'}</span>
                    </div>

                    <div className="cursor-pointer relative">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
                        </svg>
                    </div>

                    <div className="cursor-pointer" onClick={handleThemeToggle}>
                        {isDarkMode ? (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                            </svg>
                        ) : (
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ri-moon-line" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path>
                            </svg>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer">
                            <Image
                                src="/ava.jpg"
                                alt="User Avatar"
                                width={34}
                                height={34}
                                className="rounded-full"
                            />
                        </div>
                        <div className="xl:block lg:hidden md:hidden sm:hidden hidden">
                            <div className="flex flex-col">
                                <span className="text-[15px] font-semibold dark:text-[#999]">Super Admin</span>
                                <span className="text-left text-[13px] uppercase dark:text-[#999]">Admin</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Navbar;