"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaReact, FaCheck } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";

// --- Types ---
type LessonState = 0 | 1 | 2;

type Lesson = {
    title: string;
    state: LessonState;
};

const Topics = () => {
    const defaultLessons: Lesson[] = [
        { title: "useState Hook", state: 0 },
        { title: "useEffect Hook", state: 0 },
        { title: "Props", state: 0 },
        { title: "State Lifting", state: 0 },
        { title: "Context API", state: 0 },
        { title: "Custom Hooks", state: 0 },
        { title: "React Router", state: 0 },
        { title: "Conditional Rendering", state: 0 },
    ];

    const [topicLesson, setTopicLesson] = useState<Lesson[]>([]);
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const [showNotes, setShowNotes] = useState<{ [key: string]: boolean }>({});

    // Load lessons from localStorage
    useEffect(() => {
        const savedLessons = localStorage.getItem("react-topic-progress");
        const savedNotes = localStorage.getItem("react-lesson-notes");

        if (savedLessons) setTopicLesson(JSON.parse(savedLessons));
        else setTopicLesson(defaultLessons);

        if (savedNotes) setNotes(JSON.parse(savedNotes));
    }, []);

    // Save lessons to localStorage
    useEffect(() => {
        if (topicLesson.length > 0) {
            localStorage.setItem("react-topic-progress", JSON.stringify(topicLesson));
        }
    }, [topicLesson]);

    // Save notes to localStorage
    useEffect(() => {
        localStorage.setItem("react-lesson-notes", JSON.stringify(notes));
    }, [notes]);

    const handleClick = (index: number) => {
        setTopicLesson((prev) =>
            prev.map((lesson, i) =>
                i === index ? { ...lesson, state: ((lesson.state + 1) % 3) as LessonState } : lesson
            )
        );
    };

    const handleBack = () => window.history.back();

    const getCheckboxClasses = (state: LessonState) => {
        switch (state) {
            case 1:
                return "bg-yellow-500 border-yellow-500";
            case 2:
                return "bg-purple-500 border-purple-500";
            default:
                return "bg-white border-gray-300 hover:border-purple-500";
        }
    };

    const getStateText = (state: LessonState) => {
        switch (state) {
            case 1:
                return "In Progress";
            case 2:
                return "Completed";
            default:
                return "Not Started";
        }
    };

    const getStateBadgeClasses = (state: LessonState) => {
        switch (state) {
            case 1:
                return "bg-yellow-500 text-white";
            case 2:
                return "bg-purple-500 text-white";
            default:
                return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const completedCount = topicLesson.filter((lesson) => lesson.state === 2).length;
    const progressPercent = topicLesson.length
        ? Math.round((completedCount / topicLesson.length) * 100)
        : 0;

    const toggleNotes = (title: string) => {
        setShowNotes((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    const handleNotesChange = (title: string, value: string) => {
        setNotes((prev) => ({ ...prev, [title]: value }));
    };

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
                                <FaReact className="h-7 w-7 text-purple-700 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">React</p>
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
                            className="flex flex-col gap-3 p-5 bg-white dark:bg-gray-800 rounded-lg shadow"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {/* Tri-state checkbox */}
                                    <div
                                        onClick={() => handleClick(index)}
                                        className={`h-7 w-7 cursor-pointer rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${getCheckboxClasses(
                                            lesson.state
                                        )}`}
                                    >
                                        {lesson.state === 1 && <LuClock className="text-white text-lg" />}
                                        {lesson.state === 2 && <FaCheck className="text-white text-sm" />}
                                    </div>

                                    <p className="font-semibold">{lesson.title}</p>
                                </div>

                                <div className="flex gap-4">
                                    {/* Lesson state badge */}
                                    <p
                                        className={`flex text-xs items-center px-3 py-1 rounded-full font-medium ${getStateBadgeClasses(
                                            lesson.state
                                        )}`}
                                    >
                                        {getStateText(lesson.state)}
                                    </p>

                                    {/* Notes button */}
                                    <button
                                        onClick={() => toggleNotes(lesson.title)}
                                        className="group cursor-pointer py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-purple-500 transition-colors duration-200"
                                    >
                                        <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-200">
                                            <GrNotes className="h-3 w-3 text-gray-500 dark:text-gray-400 group-hover:text-white" />
                                            Notes
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* Notes Textarea */}
                            {showNotes[lesson.title] && (
                                <textarea
                                    value={notes[lesson.title] || ""}
                                    onChange={(e) => handleNotesChange(lesson.title, e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                                    placeholder="Write your notes here..."
                                    rows={3}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Topics;
