"use client";

import { useEffect, useState } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

const ToggleBar = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;

        root.classList.toggle("dark");
        const isDark = root.classList.contains("dark");

        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDark(isDark);
    };

    return (
        <div className="w-screen h-20 border-b border-gray-300 dark:border-gray-700 flex justify-end px-4">
            <button
                onClick={toggleTheme}
                className={`my-5 px-3 rounded-xl transition-colors duration-200
            ${dark
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
            >
                {dark ? (
                    <IoIosSunny className="text-yellow-400 hover:text-white text-xl" />
                ) : (
                    <IoIosMoon className="text-gray-800 hover:text-black text-xl" />
                )}
            </button>
        </div>
    );
};

export default ToggleBar;
