import React from 'react'
import {
    FaChartBar,
    FaCalendarAlt,
    FaFacebookMessenger,
    FaUserCog,
    FaListAlt
} from "react-icons/fa"
import {
    IoIosStats,
    IoIosSettings,
    IoIosPerson,
    IoIosPersonAdd,
    IoIosEyeOff,
    IoIosLogIn,
    IoIosLogOut
} from "react-icons/io"
import { LinkItems } from './LinkItems';

const link = [
    {
        href: "#",
        icon: FaChartBar,
        text: "Dashboard"
    },
    {
        href: "#",
        icon: FaCalendarAlt,
        text: "Kanban",
        badge: {
            text: "Pro",
            color: "bg-gray-100 text-gray-800",
            darkColor: "dark:bg-gray-700 dark:text-gray-300"
        }
    },
    {
        href: "#",
        icon: FaFacebookMessenger,
        text: "Inbox",
        badge: {
            text: "4",
            color: "bg-blue-100 text-blue-800",
            darkColor: "dark:bg-blue-900 dark:text-blue-300"
        }
    },
    {
        href: "#",
        icon: FaUserCog,
        text: "Users"
    },
    {
        href: "#",
        icon: FaListAlt,
        text: "Product"
    },
    {
        href: "#",
        icon: IoIosLogIn,
        text: "Sign In"
    },
    {
        href: "#",
        icon: IoIosLogOut,
        text: "Sign Out"
    },
];

export const SidebarDash = ({ isSidebarOpen }:any ) => {

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full px-3 pb-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
                { link.map((links, index) => (
                    <LinkItems key={index} {...links}/>
                ))}
            </ul>
        </div>
    </aside>
  )
}
