"use client";

import React, { useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";

const DashboardPage = () => {
    // -------------------- Study Today --------------------
    const studyData = [
        {
            topic: "React",
            about: [
                "useState",
                "useEffect",
                "Props",
                "State lifting",
                "Context API",
                "Custom Hooks",
                "React Router",
                "Conditional rendering",
                "Forms handling",
                "Dark Mode toggle",
                "Error Boundaries",
            ],
        },
        {
            topic: "JavaScript",
            about: [
                "Array methods",
                "Closures",
                "Promises",
                "Async/Await",
                "Event loop",
                "Hoisting",
                "ES6 Modules",
                "Destructuring",
                "Spread & Rest",
                "Call, Apply, Bind",
                "Object manipulation",
            ],
        },
        {
            topic: "Git",
            about: [
                "git init",
                "git clone",
                "git add",
                "git commit",
                "git push",
                "git pull",
                "git merge",
                "git rebase",
                "git stash",
                "git branch",
                "git checkout",
            ],
        },
        {
            topic: "SQL",
            about: [
                "SELECT",
                "JOIN",
                "GROUP BY",
                "ORDER BY",
                "WHERE",
                "HAVING",
                "INSERT",
                "UPDATE",
                "DELETE",
                "Indexes",
                "Subqueries",
            ],
        },
        {
            topic: "System Design",
            about: [
                "REST APIs",
                "Scalability basics",
                "Load Balancing",
                "Caching strategies",
                "Database design",
                "Microservices",
                "Rate limiting",
                "Data partitioning",
                "Message Queues",
                "CAP theorem",
                "High availability",
            ],
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
        if (mounted) localStorage.setItem("study-selected", JSON.stringify(selectedStudy));
    }, [selectedStudy, mounted]);

    const toggleStudy = (key: string) => {
        setSelectedStudy(
            selectedStudy.includes(key)
                ? selectedStudy.filter((i) => i !== key)
                : [...selectedStudy, key]
        );
    };

    // -------------------- Notes & Reflections --------------------
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) setNotes(savedNotes);
    }, []);

    // -------------------- Recent Activity --------------------
    const [recentActivities, setRecentActivities] = useState<{ text: string }[]>([]);

    // -------------------- Save button action --------------------
    const saveLog = () => {
        // Only save the selected "about" items (without topic prefix)
        const newActivities = selectedStudy.map((key) => {
            // key is topic + point, e.g., "ReactuseState"
            // Extract the "about" part by removing the topic prefix
            for (let item of studyData) {
                for (let point of item.about) {
                    if (key === item.topic + point) return { text: point };
                }
            }
            return { text: key };
        });

        setRecentActivities(newActivities); // Update Recent Activity
        localStorage.setItem("notes", notes); // Save notes
        localStorage.setItem("recent-activities", JSON.stringify(newActivities)); // Save activities
    };


    useEffect(() => {
        const savedActivities = localStorage.getItem("recent-activities");
        if (savedActivities) setRecentActivities(JSON.parse(savedActivities));
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* -------------------- Study Today -------------------- */}
            <div className="border border-gray-300 shadow-md rounded-lg p-7 my-6 bg-white dark:bg-gray-800">
                <p className="font-semibold mb-2">What did you study today?</p>
                {studyData.map((item) => (
                    <div key={item.topic} className="mb-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.topic}</p>
                        <div className="flex flex-wrap gap-2">
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

            {/* -------------------- Notes & Reflections -------------------- */}
            <div className="border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg p-7 my-6">
                <p className="font-semibold">Notes & Reflections</p>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-sm h-40 mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What did you learn today? Any challenges or breakthroughs?"
                />
                <div className="flex justify-center">
                    <button
                        onClick={saveLog}
                        className="mt-2 flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
                    >
                        <LuSave /> Save Today's Log
                    </button>
                </div>
            </div>

            {/* -------------------- Recent Activity -------------------- */}
            <div className="border border-gray-300 shadow-md rounded-lg p-7 bg-white dark:bg-gray-800">
                <h2 className="text-md font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Recent Activity
                </h2>
                <div className="border p-5 border-gray-300 bg-gray-100 w-full h-full dark:bg-gray-700 rounded-xl">
                    <div className="flex justify-between mb-3">
                        <p className="text-sm font-semibold">
                            Today
                        </p>
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
                            <div key={index} className="inline text-xs bg-purple-200 dark:bg-purple-500 text-purple-700 dark:text-gray-200 px-3 py-1 rounded-full ">
                                {activity.text}
                            </div>  
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default DashboardPage;
