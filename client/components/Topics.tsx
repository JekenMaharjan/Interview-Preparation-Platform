"use client";

import React, { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiMaterialdesignicons } from "react-icons/si";
import { useRouter } from "next/navigation";

// --- Types ---
type LessonState = 0 | 1 | 2;
type Lesson = { title: string; state: LessonState };

const topicKeys = [
    { name: "React", key: "react-topic-progress", icon: <FaReact className="h-7 w-7 text-purple-700 dark:text-purple-300" /> },
    { name: "JavaScript", key: "js-topic-progress", icon: <IoLogoJavascript className="h-7 w-7 text-purple-700 dark:text-purple-300" /> },
    { name: "Git", key: "git-topic-progress", icon: <FaGitAlt className="h-7 w-7 text-purple-700 dark:text-purple-300" /> },
    { name: "SQL", key: "mysql-topic-progress", icon: <SiMysql className="h-7 w-7 text-purple-700 dark:text-purple-300" /> },
    { name: "System Design", key: "system-design-topic-progress", icon: <SiMaterialdesignicons className="h-7 w-7 text-purple-700 dark:text-purple-300" /> },
];

const Topics = () => {
    const router = useRouter();
    const [topicsProgress, setTopicsProgress] = useState<
        {
            name: string;
            icon: React.ReactNode;
            completed: number;
            total: number;
            progress: number;
        }[]
    >([]);

    useEffect(() => {
        const updatedTopics = topicKeys.map((topic) => {
            const saved = localStorage.getItem(topic.key);
            let lessons: Lesson[] = [];
            if (saved) lessons = JSON.parse(saved);
            const completed = lessons.filter((l) => l.state === 2).length;
            const total = lessons.length || 0;
            const progress = total ? Math.round((completed / total) * 100) : 0;

            return {
                name: topic.name,
                icon: topic.icon,
                completed,
                total,
                progress,
            };
        });

        setTopicsProgress(updatedTopics);
    }, []);

    const topicsPrep = (topicName: string) => {
        const slug = topicName.toLowerCase().replace(/\s+/g, "-");
        router.push(`topics/${slug}`);
    };

    return (
        <div className="mt-6 px-4 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicsProgress.length === 0 ? (
                    <p className="text-gray-500">No topics available.</p>
                ) : (
                    topicsProgress.map((topic, index) => (
                        <div
                            key={index}
                            onClick={() => topicsPrep(topic.name)}
                            className="flex flex-col w-full cursor-pointer hover:shadow-md border border-gray-300 dark:border-gray-700 p-5 shadow-sm rounded-xl bg-white dark:bg-gray-800"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex p-3 bg-purple-100 dark:bg-purple-900 rounded-xl shrink-0">
                                        {topic.icon || <div className="h-7 w-7 bg-gray-300 rounded-full" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-md font-bold leading-tight">{topic.name}</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {topic.completed} of {topic.total || 0} topics completed
                                        </p>
                                    </div>
                                </div>
                                <div className="font-bold text-purple-600 text-lg">
                                    {topic.progress}%
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${topic.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Topics;
