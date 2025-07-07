'use client'
import { menu } from '@/Utils/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import SubmenuSidebarItem from '../SidebarSubMenu/SubmenuSidebarItem';
// import SubmenuSidebarItem from '../SubmenuSidebar/SubmenuSidebarItem';
// import { menu } from '@/data/Sidebar';

const Sidebar = ({ children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const actualWidth = isOpen || isHovered;
    const sidebarWidth = actualWidth
        ? "xl:w-[320px] lg:w-[280px] md:w-[180px] sm:w-[160px]"
        : "xl:w-[100px] lg:w-[80px] md:w-[70px] sm:w-[70px]";
    const sidebarPosition = isOpen
        ? "lg:pl-[280px] xl:pl-[320px]"
        : "lg:pl-[80px] xl:pl-[100px]";

    const toggleSidebar = () => setIsOpen(!isOpen);
    useEffect(() => {
        (async () => {
            // let result = await getCategories({ pageSize: 10, pageindex: 0, searchText: '' }, router);
            // const result = await createCategory({
            //     name: "category10",
            //     description: "string",
            //     isActive: true
            // }, router);
            // console.log("🚀 ~ result:", result)
        })()
    }
    )
    return (
        <>
            <div className="h-screen z-10">
                <div
                    onMouseEnter={() => !isOpen && setIsHovered(true)}
                    onMouseLeave={() => !isOpen && setIsHovered(false)}
                    className={`elegant-scroll transition-all duration-700 ${sidebarWidth} hidden lg:block fixed overflow-y-auto h-screen bg-lightBlack bg-gradient-to-b dark:from-gradientBlackLight dark:to-gradientBlackDark`}
                >
                    <div className="text-sm text-white flex flex-col gap-1 p-4">
                        <div className={`flex items-center ${!actualWidth ? "justify-center" : "justify-between"}`}>
                            <Link href='/'>
                                <div className="flex items-center p-2">
                                    <h1 className={`dark:text-primary text-primary text-2xl font-semibold ${!actualWidth ? "justify-center" : "justify-start"}`}>D</h1>
                                    <h1 className={`dark:text-primary text-primary text-2xl font-semibold ${!actualWidth ? 'hidden' : ''}`}>ashboard</h1>
                                </div>
                            </Link>
                            <div className={`${!actualWidth ? "hidden" : ""}`}>
                                <button onClick={toggleSidebar} className="cursor-pointer p-1 hover:bg-[#334155]">
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
                            </div>
                        </div>

                        {menu.map((item, index) => (
                            <SubmenuSidebarItem
                                key={index}
                                item={item}
                                actualWidth={actualWidth}
                                toggle={toggleSidebar}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={`${sidebarPosition} w-full duration-500 transition-all`}>
                <div className='flex flex-col justify-between min-h-[calc(100vh-64px)]'>
                    <div>
                        <Navbar toggleSidebar={toggleSidebar} />
                        <div className="overflow-scroll dark:bg-background bg-lightBg p-[30px]">
                            {children}
                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </>
    );
};

export default Sidebar;