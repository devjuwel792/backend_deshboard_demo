'use client'
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubmenuSidebarItem = ({ item, actualWidth, forceClose = false }) => {
    const pathname = usePathname();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const isActive = pathname === item.href;

    // Automatically close submenu when sidebar is collapsed GPT
    useEffect(() => {
        if (!actualWidth) {
            setIsSubmenuOpen(false);
        }
    }, [actualWidth]);

    // Also react to forced closure (for children) GPT
    useEffect(() => {
        if (forceClose) {
            setIsSubmenuOpen(false);
        }
    }, [forceClose]);

    const toggleSubmenu = () => setIsSubmenuOpen((prev) => !prev);

    if (item.children) {
        return (
            <div>
                <div
                    onClick={toggleSubmenu}
                    className={`flex items-center gap-2 
                        text-[#c5c5c5] font-medium py-3 px-4 
                        transition-all duration-200 cursor-pointer
                        ${!actualWidth ? 'justify-center' : ' justify-start '}
                        ${isActive ? 'bg-[#2b333b] text-secondary-orange' : 'hover:bg-[#334155]'}`}
                >
                    <span className="text-lg">{item.icon}</span>
                    <span className={`text-[15px] line-clamp-1 ${!actualWidth ? 'hidden' : ''}`}>{item.label}</span>
                    <span className={`${actualWidth ? "" : "hidden"}`}>
                        {!isSubmenuOpen ? (
                            <ChevronDown size={18} aria-hidden="true" />
                        ) : (
                            <ChevronUp size={18} aria-hidden="true" />
                        )}
                    </span>
                </div>

                <div
                    className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out transform origin-top
                        ${isSubmenuOpen ? 'opacity-100 scale-y-100 max-h-[500px]' : 'opacity-0 scale-y-0 max-h-0'}
                    `}
                >
                    {item.children.map((child, index) => (
                        <SubmenuSidebarItem
                            key={index}
                            item={child}
                            actualWidth={actualWidth}
                            forceClose={!actualWidth}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Link
            href={item?.href}
            aria-label={item.label}
            className={`flex items-center gap-2
                text-[#c5c5c5] font-medium py-3 px-4 
                transition-all duration-200
                ${!actualWidth ? ' justify-center ' : ' justify-start '}
                ${isActive ? 'bg-[#2b333b] text-secondary-orange' : 'hover:bg-[#334155]'}`}
        >
            <span className="text-lg">{item.icon}</span>
            <span className={`text-[15px] line-clamp-1 ${!actualWidth ? 'hidden' : ''}`}>{item.label}</span>
        </Link>
    );
};

export default SubmenuSidebarItem;