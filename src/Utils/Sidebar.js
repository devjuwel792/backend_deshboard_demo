import {
    Bell,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Package,
    PackagePlus,
    Repeat,
    Settings,
    Star,
    Store,
    Users
} from "lucide-react";

export const menu = [
    {
        icon: <LayoutDashboard size={16} />,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: <Package size={16} />,
        label: "Products",
        href: "/products",
    },
    {
        icon: <PackagePlus size={16} />,
        label: "Add Product",
        href: "/add-product",
    },
    {
        icon: <Megaphone size={16} />,
        label: "Category",
        href: "/categories",
    },
    {
        icon: <Megaphone size={16} />,
        label: "Color",
        href: "/colors",
    },
    {
        icon: <Megaphone size={16} />,
        label: "Sizes",
        href: "/sizes",
    },
    {
        icon: <Users size={16} />,
        label: "Orders",
        href: "/orders",
        children: [
            {
                icon: <Store size={16} />,
                label: "All Orders",
                href: "/orders/all-orders"
            },
            {
                icon: <Users size={16} />,
                label: "Order Item",
                href: "/orders/order-item"
            }
        ]
    },
    {
        icon: <Star size={16} />,
        label: "Reviews",
        href: "/review"
    },
    {
        icon: <HelpCircle size={16} />,
        label: "Users",
        href: "/users"
    },
    {
        icon: <Bell size={16} />,
        label: "Cart",
        href: "/cart"
    },
    {
        icon: <Repeat size={16} />,
        label: "Address",
        href: "/address"
    },
    {
        icon: <Repeat size={16} />,
        label: "Payment",
        href: "/payment"
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