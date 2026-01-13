"use client";

import React, { useEffect, useState } from "react";
import Topics from "./Topics";
import { GiProgression } from "react-icons/gi";
import CircularProgress from "./CircularProgress";
import { MdOutlineDoneOutline } from "react-icons/md";

const topicKeys = [
    "react-topic-progress",
    "javascript-topic-progress",
    "git-topic-progress",
    "mysql-topic-progress",
    "system-design-topic-progress",
];

type LessonState = 0 | 1 | 2;
type Lesson = { title: string; state: LessonState };

const DashboardPage = () => {
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalInProgress, setTotalInProgress] = useState(0);
    const [totalNotStarted, setTotalNotStarted] = useState(0);
    const [totalTopics, setTotalTopics] = useState(0);
    const [studyDays, setStudyDays] = useState(1);

    // --- Load all topics progress ---
    useEffect(() => {
        let completed = 0;
        let inProgress = 0;
        let notStarted = 0;
        let topicsCount = 0;

        topicKeys.forEach((key) => {
            const saved = localStorage.getItem(key);
            if (saved) {
                const lessons: Lesson[] = JSON.parse(saved);
                topicsCount += lessons.length;
                completed += lessons.filter((l) => l.state === 2).length;
                inProgress += lessons.filter((l) => l.state === 1).length;
                notStarted += lessons.filter((l) => l.state === 0).length;
            }
        });

        setTotalCompleted(completed);
        setTotalInProgress(inProgress);
        setTotalNotStarted(notStarted);
        setTotalTopics(topicsCount);
    }, []);

    // --- Calculate daily study session (days) ---
    useEffect(() => {
        const today = new Date().setHours(0, 0, 0, 0); // Today at midnight
        const firstDay = localStorage.getItem("first-study-day");

        if (!firstDay) {
            localStorage.setItem("first-study-day", today.toString());
            setStudyDays(1);
        } else {
            const diff = Math.floor(
                (today - parseInt(firstDay)) / (1000 * 60 * 60 * 24)
            );
            setStudyDays(diff + 1);
        }
    }, []);

    const infoCards = [
        {
            about: "Completed",
            completed: totalCompleted,
            outOf: totalTopics,
            icon: <MdOutlineDoneOutline className="w-5 h-5 text-purple-700" />,
        },
        {
            about: "In Progress",
            completed: totalInProgress,
            outOf: "topics active",
            icon: <GiProgression className="w-5 h-5 text-purple-700" />,
        },
        {
            about: "Not Started",
            completed: totalNotStarted,
            outOf: "topics remaining",
            icon: <GiProgression className="w-5 h-5 text-purple-700" />,
        },
    ];

    return (
        <div className="px-4 sm:px-0">
            {/* ===== Top Stats ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
                {/* Circular Progress Card */}
                <div
                    className="flex items-center justify-center
                        bg-white dark:bg-gray-800
                        border border-gray-300 dark:border-gray-600
                        rounded-xl min-h-[160px]"
                >
                    <CircularProgress
                        value={totalTopics ? Math.round((totalCompleted / totalTopics) * 100) : 0}
                    />
                </div>

                {/* Info Cards */}
                {infoCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between
                        p-6 bg-white dark:bg-gray-800
                        border border-gray-300 dark:border-gray-600
                        rounded-xl min-h-[160px]"
                    >
                        <div>
                            <p className="text-sm text-gray-500 font-semibold mb-2">
                                {card.about}
                            </p>
                            <p className="text-3xl font-bold text-black dark:text-white">
                                {card.completed}
                            </p>
                            <p className="text-sm text-gray-500">
                                {card.outOf === totalTopics ? `of ${card.outOf} topics` : card.outOf}
                            </p>
                        </div>

                        <div className="bg-purple-200 p-3 rounded-2xl">{card.icon}</div>
                    </div>
                ))}
            </div>

            {/* ===== Motivation Banner ===== */}
            <div
                className="flex flex-col sm:flex-row items-center
                        gap-4 sm:gap-6 p-6 mb-7
                        bg-purple-100 dark:bg-purple-200/20
                        border border-gray-300 dark:border-gray-600
                        rounded-xl"
            >
                <div className="flex items-center justify-center bg-purple-300 w-20 h-20 rounded-full">
                    <GiProgression className="w-7 h-7 text-purple-600" />
                </div>

                <div className="text-center sm:text-left">
                    <p className="font-semibold text-md dark:text-white mb-1">
                        Keep Going!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Great Progress! Stay focused and keep learning.
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-500">
                        You've logged {studyDays} study session{studyDays > 1 ? "s" : ""} so far!
                    </p>
                </div>
            </div>

            {/* ===== Categories ===== */}
            <p className="font-semibold text-lg mb-4">Categories</p>
            <Topics />
        </div>
    );
};

export default DashboardPage;
