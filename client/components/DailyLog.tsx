"use client";

import React, { useState, useEffect } from "react";
import { IoBookOutline } from "react-icons/io5";
import { LuSave } from "react-icons/lu";

const DailyLog = () => {
    // -------------------- Study Today --------------------
    const studyData = [
        {
            topic: "React",
            about: ["useState", "useEffect", "Props", "State lifting",
                "Context API", "Custom Hooks", "React Router", "Conditional rendering",
                "Forms handling", "Dark Mode toggle", "Error Boundaries"],
        },
        {
            topic: "JavaScript",
            about: ["Array methods", "Closures", "Promises", "Async/Await",
                "Event loop", "Hoisting", "ES6 Modules", "Destructuring",
                "Spread & Rest", "Call, Apply, Bind", "Object manipulation"],
        },
        {
            topic: "Git",
            about: ["git init", "git clone", "git add", "git commit",
                "git push", "git pull", "git merge", "git rebase",
                "git stash", "git branch", "git checkout"],
        },
        {
            topic: "SQL",
            about: ["SELECT", "JOIN", "GROUP BY", "ORDER BY", "WHERE",
                "HAVING", "INSERT", "UPDATE", "DELETE",
                "Indexes","Subqueries"],
        },
        {
            topic: "System Design",
            about: ["REST APIs", "Scalability basics", "Load Balancing",
                "Caching strategies", "Database design", "Microservices",
                "Rate limiting", "Data partitioning", "Message Queues",
                "CAP theorem", "High availability"],
        },
    ];

    const [selectedStudy, setSelectedStudy] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("study-selected");
        if (saved) setSelectedStudy(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("study-selected", JSON.stringify(selectedStudy));
        }
    }, [selectedStudy, mounted]);

    const toggleStudy = (key: string) => {
        setSelectedStudy((prev) =>
            prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
        );
    };

    // -------------------- Notes --------------------
    const [notes, setNotes] = useState("");
    const [savedText, setSavedText] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) setNotes(savedNotes);

        const savedText = localStorage.getItem("saved-text");
        if (savedText) setSavedText(savedText);
    }, []);

    // -------------------- Recent Activity --------------------
    const [recentActivities, setRecentActivities] = useState<{ text: string }[]>([]);

    useEffect(() => {
        const savedActivities = localStorage.getItem("recent-activities");
        if (savedActivities) setRecentActivities(JSON.parse(savedActivities));
    }, []);

    // -------------------- Save --------------------
    const saveLog = () => {
        const newActivities = selectedStudy.map((key) => {
            for (let item of studyData) {
                for (let point of item.about) {
                    if (key === item.topic + point) {
                        return { text: point };
                    }
                }
            }
            return { text: key };
        });

        setRecentActivities(newActivities);
        setSavedText(notes);

        localStorage.setItem("notes", notes);
        localStorage.setItem("saved-text", notes);
        localStorage.setItem("recent-activities", JSON.stringify(newActivities));
    };

    if (!mounted) return null;

    return (
        <div className="grid xl:grid-cols-2  gap-6 min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8">
            {/* -------------------- Main Grid -------------------- */}
            <div className="flex flex-col gap-6">
                {/* -------------------- Study Today -------------------- */}
                <div className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-5 sm:p-7">
                    <p className="font-semibold mb-3 text-sm sm:text-base">
                        What did you study today?
                    </p>

                    {studyData.map((item) => (
                        <div key={item.topic} className="mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {item.topic}
                            </p>

                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {item.about.map((point) => {
                                    const key = item.topic + point;
                                    const active = selectedStudy.includes(key);

                                    return (
                                        <span
                                            key={key}
                                            onClick={() => toggleStudy(key)}
                                            className={`cursor-pointer text-xs px-3 py-1 rounded-full transition
                                                ${active
                                                    ? "bg-purple-500 text-white"
                                                    : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                                }`}
                                        >
                                            {active && "✔ "} {point}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* -------------------- Notes -------------------- */}
                <div className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-5 sm:p-7">
                    <p className="font-semibold text-sm sm:text-base">
                        Notes & Reflections
                    </p>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full mt-2 h-32 sm:h-40 lg:h-48 text-sm p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="What did you learn today? Any challenges or breakthroughs?"
                    />

                    <div className="flex items-center justify-center">
                        <button
                            onClick={saveLog}
                            className="mt-3 w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
                        >
                            <LuSave /> Save Today's Log
                        </button>
                    </div>
                </div>
            </div>

            {/* -------------------- Recent Activity -------------------- */}
            <div className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg p-5 sm:p-7">
                <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold mb-4">
                    <IoBookOutline /> Recent Activity
                </h2>

                <div className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl p-4">
                    <div className="flex justify-between mb-3">
                        <p className="text-sm font-semibold">Today</p>
                        <p className="text-xs text-gray-400">
                            {recentActivities.length} topics
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {recentActivities.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No recent activity. Start logging your study today!
                            </p>
                        )}

                        {recentActivities.map((activity, index) => (
                            <span
                                key={index}
                                className="text-xs bg-purple-200 dark:bg-purple-500 text-purple-700 dark:text-gray-200 px-3 py-1 rounded-full"
                            >
                                {activity.text}
                            </span>
                        ))}
                    </div>

                    {savedText && (
                        <div className="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-xs sm:text-sm leading-relaxed">
                            {savedText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyLog;
