"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

// --- Types ---
type LessonState = 0 | 1 | 2; // 0 = Not Started, 1 = In Progress, 2 = Completed

type Lesson = {
    title: string;
    state: LessonState;
};

const Topics = () => {
    // Original lessons preserved
    const defaultLessons: Lesson[] = [
        { title: 'Array methods', state: 0 },
        { title: 'Closures', state: 0 },
        { title: 'Promises', state: 0 },
        { title: 'Async/Await', state: 0 },
        { title: 'Event loop', state: 0 },
        { title: 'Hoisting', state: 0 },
        { title: 'ES6 Modules', state: 0 },
        { title: 'Destructuring', state: 0 },
        { title: 'Spread & Rest', state: 0 },
        { title: 'Call, Apply, Bind', state: 0 },
        { title: 'Object manipulation', state: 0 }
    ];

    // --- State ---
    const [topicLesson, setTopicLesson] = useState<Lesson[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedLessons = localStorage.getItem("js-topic-progress");
        if (savedLessons) {
            setTopicLesson(JSON.parse(savedLessons));
        } else {
            setTopicLesson(defaultLessons);
        }
    }, []);

    // Save to localStorage whenever topicLesson changes
    useEffect(() => {
        if (topicLesson.length > 0) {
            localStorage.setItem(
                "js-topic-progress",
                JSON.stringify(topicLesson)
            );
        }
    }, [topicLesson]);

    // --- Handlers ---
    const handleClick = (index: number) => {
        setTopicLesson(prev =>
            prev.map((lesson, i) =>
                i === index
                    ? { ...lesson, state: ((lesson.state + 1) % 3) as LessonState }
                    : lesson
            )
        );
    };

    const handleBack = () => window.history.back();

    // --- Helpers ---
    const getCheckboxClasses = (state: LessonState): string => {
        switch (state) {
            case 1: return "bg-yellow-500 border-yellow-500";
            case 2: return "bg-purple-500 border-purple-500";
            default: return "bg-white border-gray-300 hover:border-purple-500";
        }
    };

    const getStateText = (state: LessonState): string => {
        switch (state) {
            case 1: return "In Progress";
            case 2: return "Completed";
            default: return "Not Started";
        }
    };

    const getStateBadgeClasses = (state: LessonState): string => {
        switch (state) {
            case 1: return "bg-yellow-500 text-white";
            case 2: return "bg-purple-500 text-white";
            default: return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const completedCount = topicLesson.filter(l => l.state === 2).length;
    const progressPercent = topicLesson.length
        ? Math.round((completedCount / topicLesson.length) * 100)
        : 0;

    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-60 pt-24 p-6">
                {/* Back */}
                <p
                    onClick={handleBack}
                    className="flex mb-5 items-center text-gray-500 text-sm cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <MdOutlineKeyboardBackspace className="w-5 h-5 mr-2" />
                    Back to Topics
                </p>

                {/* Header */}
                <div className="flex flex-col w-full rounded-xl bg-white dark:bg-gray-800 p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                                <IoLogoJavascript className="h-7 w-7 text-purple-700 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">JavaScript</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {completedCount} of {topicLesson.length} topics completed
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{progressPercent}%</p>
                            <p className="text-sm text-gray-500">Completed</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Lessons */}
                <div className="grid grid-cols-1 gap-4">
                    {topicLesson.map((lesson, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-5 bg-white dark:bg-gray-800 rounded-lg shadow"
                        >
                            <div className="flex items-center gap-4">
                                {/* Tri-state checkbox */}
                                <div
                                    onClick={() => handleClick(index)}
                                    className={`h-7 w-7 cursor-pointer rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${getCheckboxClasses(lesson.state)}`}
                                >
                                    {lesson.state === 1 && <LuClock className="text-white text-lg" />}
                                    {lesson.state === 2 && <FaCheck className="text-white text-sm" />}
                                </div>

                                <p className="font-semibold">{lesson.title}</p>
                            </div>

                            {/* Lesson state badge */}
                            <p className={`text-xs px-3 py-1 rounded-full font-medium ${getStateBadgeClasses(lesson.state)}`}>
                                {getStateText(lesson.state)}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Topics;
