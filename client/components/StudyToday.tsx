"use client";

import React, { useState, useEffect } from "react";

const StudyToday = () => {
    const data = [
        { topic: "React", about: ["useState", "useEffect", "Props", "State lifting", "Context API", "Custom Hooks", "React Router", "Conditional rendering", "Forms handling", "Dark Mode toggle", "Error Boundaries"] },
        { topic: "JavaScript", about: ["Array methods", "Closures", "Promises", "Async/Await", "Event loop", "Hoisting", "ES6 Modules", "Destructuring", "Spread & Rest", "Call, Apply, Bind", "Object manipulation"] },
        { topic: "Git", about: ["git init", "git clone", "git add", "git commit", "git push", "git pull", "git merge", "git rebase", "git stash", "git branch", "git checkout"] },
        { topic: "SQL", about: ["SELECT", "JOIN", "GROUP BY", "ORDER BY", "WHERE", "HAVING", "INSERT", "UPDATE", "DELETE", "Indexes", "Subqueries"] },
        { topic: "System Design", about: ["REST APIs", "Scalability basics", "Load Balancing", "Caching strategies", "Database design", "Microservices", "Rate limiting", "Data partitioning", "Message Queues", "CAP theorem", "High availability"] },
    ];

    const [selected, setSelected] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false); // fix hydration

    // Only read localStorage after client mounts
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("study-selected");
        if (saved) {
            setSelected(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("study-selected", JSON.stringify(selected));
        }
    }, [selected, mounted]);

    const toggle = (key: string) => {
        setSelected(selected.includes(key) ? selected.filter((i) => i !== key) : [...selected, key]);
    };

    // Prevent rendering on server
    if (!mounted) return null;

    return (
        <div className="border border-gray-300 shadow-md rounded-lg p-7 my-6 bg-white dark:bg-gray-800">
            <p className="font-semibold mb-2">What did you study today?</p>

            {data.map((item) => (
                <div key={item.topic} className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.topic}</p>

                    <div className="flex flex-wrap gap-2">
                        {item.about.map((point) => {
                            const key = item.topic + point;
                            const active = selected.includes(key);

                            return (
                                <span
                                    key={key}
                                    onClick={() => toggle(key)}
                                    className={`cursor-pointer text-xs px-3 py-1 rounded-full transition
                    ${active ? "bg-purple-500 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
                                >
                                    {active && "✔ "}
                                    {point}
                                </span>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudyToday;
