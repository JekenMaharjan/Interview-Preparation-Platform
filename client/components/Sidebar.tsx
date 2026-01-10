"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const navItemClass = (path: string) =>
        `p-4 rounded-2xl text-left font-semibold transition
    ${pathname === path
            ? "bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
            : "hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300"
        }`;

    return (
        <div className="fixed left-0 top-0 h-screen w-56 flex flex-col
        border-r bg-white border-gray-300
        dark:bg-gray-900 dark:border-gray-700">

            {/* Title */}
            <div className="border-b p-4 h-20 border-gray-300 dark:border-gray-700">
                <p className="font-bold text-purple-700 text-2xl dark:text-purple-500">
                    InterviewPrep
                </p>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                    Track Your Progress
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-4 gap-1">
                <Link href="/dashboard" className={navItemClass("/dashboard")}>
                    Dashboard
                </Link>

                <Link href="/topics" className={navItemClass("/topics")}>
                    Topics
                </Link>

                <Link href="/dailyLog" className={navItemClass("/dailyLog")}>
                    Daily Log
                </Link>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                <div className="bg-purple-100/90 dark:bg-purple-900/60 rounded-lg p-5">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Stay consistent!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Small daily progress leads to big results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
