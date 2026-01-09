"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const navItemClass = (path: string) =>
        `p-4 rounded-2xl text-left font-semibold transition ${pathname === path
            ? "bg-purple-200 text-purple-700"
            : "hover:bg-gray-100 text-gray-500"
        }`;

    return (
        <div className="fixed left-0 top-0 h-screen w-56 flex flex-col border-r border-gray-300 bg-white dark:bg-gray-900">

            {/* Title */}
            <div className="border-b p-4 h-20 border-gray-300">
                <p className="font-bold text-purple-800 text-xl">InterviewPrep</p>
                <p className="text-gray-600 text-sm">Track Your Progress</p>
            </div>

            {/* Navigation (starts from top now) */}
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

            {/* Spacer pushes footer to bottom */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="p-4 border-t border-gray-300">
                <div className="bg-purple-100/90 rounded-lg p-5">
                    <p className="text-sm font-semibold text-gray-800">
                        Stay consistent!
                    </p>
                    <p className="text-sm text-gray-500">
                        Small daily progress leads to big results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
