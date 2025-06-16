'use client'
import React from 'react';
import { ClipboardPenLine, Image, LifeBuoy, Warehouse } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const categories = [
    { name: 'General', icon: <LifeBuoy />, href: 'general' },
    { name: 'Product Image', icon: <Image />, href: 'product-image' },
    { name: 'Inventory', icon: <Warehouse />, href: 'inventory' },
    { name: 'SEO', icon: <ClipboardPenLine />, href: 'seo' },
];

const VerticalCategory = () => {
    const pathname = usePathname();
    return (
            <div className="p-4 w-full xl:min-w-[400px] h-auto bg-white dark:bg-gradientBlackDark flex sm:flex-col gap-2 overflow-x-auto">

                <ul className="flex gap-2 w-full">
                    {categories.map((category) => {
                        const href = `/products/product-categories/${category.href}`;
                        const isActive = pathname === href;

                        return (
                            <li key={category.href} className="flex-shrink-0">
                                <Link
                                    href={href}
                                    className={`relative flex items-center gap-2 px-6 py-3 xl:text-lg sm:text-xs font-medium whitespace-nowrap
                        hover:font-semibold dark:text-gray
                        ${isActive ? 'text-secondary-orange bg-[#f7eae1] dark:bg-[#292323] dark:text-primary' : ''}`}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-0 h-full w-1 bg-secondary-orange rounded-r-md"></span>
                                    )}
                                    {category.icon}
                                    {category.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
    );
};

export default VerticalCategory;