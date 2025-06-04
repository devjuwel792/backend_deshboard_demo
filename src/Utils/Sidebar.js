import {
    BadgePercent,
    Bell,
    BookOpen,
    CalendarDays,
    ClipboardList,
    FileText,
    HelpCircle,
    Home,
    Image,
    LayoutDashboard,
    LogOut,
    Mail, Megaphone,
    Package,
    PackagePlus,
    Repeat,
    Settings,
    Star,
    Store,
    Ticket,
    Truck,
    Users,
    Wallet
} from "lucide-react";

export const menu = [
    {
        icon: <LayoutDashboard size={16} />,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: <PackagePlus size={16} />,
        label: "Products",
        href: "/products",
        children: [
            {
                icon: <PackagePlus size={16} />,
                label: "Add Product",
                href: "/products/add-product"
            },
            {
                icon: <Package size={16} />,
                label: "All Product",
                href: "/products/product-list"
            },
            {
                icon: <Package size={16} />,
                label: "Product Categories",
                href: "/products/product-categories"
            },
            // {
            //     icon: <Package size={16} />,
            //     label: "Product Tags",
            //     href: "/products/product-tags"
            // }
        ]
    },
    {
        icon: <Megaphone size={16} />,
        label: "Announcements",
        href: "/announcements",
        children: [
            {
                icon: <Users size={16} />,
                label: "User Announcements",
                href: "/user-announcements"
            },
            {
                icon: <Store size={16} />,
                label: "Store Announcements",
                href: "/store-announcements"
            },
            {
                icon: <FileText size={16} />,
                label: "Page Announcements",
                href: "/page-announcements"
            },
            {
                icon: <FileText size={16} />,
                label: "Announcement Archive",
                href: "/announcement-archive"
            }
        ]
    },
    {
        icon: <Users size={16} />,
        label: "Users",
        href: "/users"
    },
    {
        icon: <Package size={16} />,
        label: "Store Management",
        href: "/store-management",
        children: [
            {
                icon: <Package size={16} />,
                label: "Products",
                href: "/products"
            },
            {
                icon: <Store size={16} />,
                label: "Stores",
                href: "/stores"
            },
            {
                icon: <ClipboardList size={16} />,
                label: "Orders",
                href: "/orders"
            },
            {
                icon: <Truck size={16} />,
                label: "Shipping",
                href: "/shipping"
            }
        ]
    },
    {
        icon: <BookOpen size={16} />,
        label: "Content",
        href: "/content",
        children: [
            {
                icon: <Image size={16} />,
                label: "Media",
                href: "/media"
            },
            {
                icon: <BookOpen size={16} />,
                label: "Blogs",
                href: "/blogs"
            },
            {
                icon: <FileText size={16} />,
                label: "Pages",
                href: "/pages"
            }
        ]
    },
    {
        icon: <Wallet size={16} />,
        label: "Finance",
        href: "/finance",
        children: [
            {
                icon: <BadgePercent size={16} />,
                label: "Taxes",
                href: "/taxes"
            },
            {
                icon: <Ticket size={16} />,
                label: "Coupons",
                href: "/coupons"
            },
            {
                icon: <CalendarDays size={16} />,
                label: "Currencies",
                href: "/currencies"
            },
            {
                icon: <Mail size={16} />,
                label: "Points",
                href: "/points"
            },
            {
                icon: <Wallet size={16} />,
                label: "Wallets",
                href: "/wallets"
            },
            {
                icon: <Repeat size={16} />,
                label: "Refunds",
                href: "/refund"
            }
        ]
    },
    {
        icon: <Star size={16} />,
        label: "Reviews",
        href: "/reviews"
    },
    {
        icon: <HelpCircle size={16} />,
        label: "FAQs",
        href: "/faqs"
    },
    {
        icon: <Bell size={16} />,
        label: "Notifications",
        href: "/notice"
    },
    {
        icon: <Repeat size={16} />,
        label: "Subscriptions",
        href: "/subscriptions"
    },
    {
        icon: <Home size={16} />,
        label: "Store Front",
        href: "/store-front"
    },
    {
        icon: <Settings size={16} />,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: <LogOut size={16} />,
        label: "Logout",
        href: "/logout"
    }
];