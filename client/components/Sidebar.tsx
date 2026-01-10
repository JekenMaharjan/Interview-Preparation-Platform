"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiFocus2Line } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const Sidebar = () => {
    const pathname = usePathname();

    const navItemClass = (path: string) =>
        `px-4 py-2 rounded-xl text-left font-semibold transition
    ${pathname === path
            ? "bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
            : "hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300"
        }`;

    return (
        <div className="fixed left-0 top-0 h-screen w-56 flex flex-col
        border-r bg-white border-gray-300
        dark:bg-gray-900 dark:border-gray-700">

            {/* Title */}
            <div className="flex gap-2 border-b p-2 h-20 border-gray-300 dark:border-gray-700">
                <RiFocus2Line className="w-15 h-15 text-purple-700"/>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-purple-600 text-xl dark:text-purple-500">
                        InterviewPrep
                    </p>
                    <p className="text-gray-500 text-xs dark:text-gray-400">
                        Track Your Progress
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-4 gap-2">
                <Link href="/dashboard" className={navItemClass("/dashboard")}>
                    <MdOutlineDashboard className="inline mr-2" />Dashboard
                </Link>

                <Link href="/topics" className={navItemClass("/topics")}>
                    <IoBookOutline className="inline mr-2" />Topics
                </Link>

                <Link href="/dailyLog" className={navItemClass("/dailyLog")}>
                    <SlCalender className="inline mr-2" />Daily Log
                </Link>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-5">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-50">
                        Stay consistent!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        Small daily progress leads to big results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
