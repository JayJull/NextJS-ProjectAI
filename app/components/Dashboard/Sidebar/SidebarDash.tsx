import React from 'react'
import { FaChartBar, FaListAlt, FaArchive } from "react-icons/fa"
import { IoIosLogOut } from "react-icons/io"
import Link from 'next/link'

export const SidebarDash = ({ isSidebarOpen }: any) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col">
            {/* Bagian Menu Utama */}
            <ul className="space-y-2 font-medium flex-grow">
                <li>
                    <Link href="/pages/Dashboard">
                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100">
                            <FaChartBar className="mr-3" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/pages/Dashboard/Manage">
                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100">
                            <FaListAlt className="mr-3" />
                            <span>Manage AI</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/pages/Dashboard/addUser">
                        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100">
                            <FaListAlt className="mr-3" />
                            <span>Add User</span>
                        </div>
                    </Link>
                </li>
            </ul>

            {/* Bagian Sign Out di bawah */}
            <div className="mt-auto">
                <Link href="/">
                    <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-100">
                        <IoIosLogOut className="mr-3" />
                        <span>Sign Out</span>
                    </div>
                </Link>
            </div>
        </div>
    </aside>
  );
};
