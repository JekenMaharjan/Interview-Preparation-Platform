"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ToggleBar from "@/components/ToggleBar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaGitAlt } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";

// --- Types ---
type LessonState = 0 | 1 | 2;

type Lesson = {
    title: string;
    state: LessonState;
};

const LESSON_KEY = "git-topic-progress";
const NOTES_KEY = "git-lesson-notes";

const Topics = () => {
    const defaultLessons: Lesson[] = [
        { title: "git init", state: 0 },
        { title: "git clone", state: 0 },
        { title: "git add", state: 0 },
        { title: "git commit", state: 0 },
        { title: "git push", state: 0 },
        { title: "git pull", state: 0 },
        { title: "git merge", state: 0 },
        { title: "git rebase", state: 0 },
        { title: "git stash", state: 0 },
        { title: "git branch", state: 0 },
        { title: "git checkout", state: 0 },
    ];

    // 🔒 Hydration guard
    const [mounted, setMounted] = useState(false);

    const [topicLesson, setTopicLesson] = useState<Lesson[]>(defaultLessons);
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const [showNotes, setShowNotes] = useState<{ [key: string]: boolean }>({});

    // ✅ Client-only load
    useEffect(() => {
        setMounted(true);

        const savedLessons = localStorage.getItem(LESSON_KEY);
        const savedNotes = localStorage.getItem(NOTES_KEY);

        setTopicLesson(savedLessons ? JSON.parse(savedLessons) : defaultLessons);
        setNotes(savedNotes ? JSON.parse(savedNotes) : {});
    }, []);

    // ✅ Persist lessons
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(LESSON_KEY, JSON.stringify(topicLesson));
        }
    }, [topicLesson, mounted]);

    // ✅ Persist notes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        }
    }, [notes, mounted]);

    // ⛔ Prevent hydration mismatch
    if (!mounted) return null;

    // --- Handlers ---
    const handleClick = (index: number) => {
        setTopicLesson((prev) =>
            prev.map((lesson, i) =>
                i === index
                    ? { ...lesson, state: ((lesson.state + 1) % 3) as LessonState }
                    : lesson
            )
        );
    };

    const toggleNotes = (title: string) => {
        setShowNotes((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    const handleNotesChange = (title: string, value: string) => {
        setNotes((prev) => ({ ...prev, [title]: value }));
    };

    const handleBack = () => window.history.back();

    // --- Helpers ---
    const getCheckboxClasses = (state: LessonState) => {
        if (state === 1) return "bg-yellow-500 border-yellow-500";
        if (state === 2) return "bg-purple-500 border-purple-500";
        return "bg-white border-gray-300 hover:border-purple-500";
    };

    const getStateText = (state: LessonState) => {
        if (state === 1) return "In Progress";
        if (state === 2) return "Completed";
        return "Not Started";
    };

    const getStateBadgeClasses = (state: LessonState) => {
        if (state === 1) return "bg-yellow-500 text-white";
        if (state === 2) return "bg-purple-500 text-white";
        return "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    };

    const completedCount = topicLesson.filter((l) => l.state === 2).length;
    const progressPercent = Math.round(
        (completedCount / topicLesson.length) * 100
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-60 pt-24 p-6">
                {/* Back */}
                <p
                    onClick={handleBack}
                    className="flex mb-5 items-center text-gray-500 text-sm cursor-pointer hover:text-gray-900 dark:text-gray-400"
                >
                    <MdOutlineKeyboardBackspace className="w-5 h-5 mr-2" />
                    Back to Topics
                </p>

                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                                <FaGitAlt className="h-7 w-7 text-purple-700 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">Git</p>
                                <p className="text-sm text-gray-500">
                                    {completedCount} of {topicLesson.length} topics completed
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">
                                {progressPercent}%
                            </p>
                            <p className="text-sm text-gray-500">Completed</p>
                        </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Lessons */}
                <div className="grid gap-4">
                    {topicLesson.map((lesson, index) => (
                        <div
                            key={lesson.title}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => handleClick(index)}
                                        className={`h-7 w-7 cursor-pointer rounded-full border-2 flex items-center justify-center ${getCheckboxClasses(
                                            lesson.state
                                        )}`}
                                    >
                                        {lesson.state === 1 && (
                                            <LuClock className="text-white" />
                                        )}
                                        {lesson.state === 2 && (
                                            <FaCheck className="text-white text-sm" />
                                        )}
                                    </div>

                                    <p className="font-semibold">{lesson.title}</p>
                                </div>

                                <div className="flex gap-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${getStateBadgeClasses(
                                            lesson.state
                                        )}`}
                                    >
                                        {getStateText(lesson.state)}
                                    </span>

                                    <button
                                        onClick={() => toggleNotes(lesson.title)}
                                        className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-purple-500 transition"
                                    >
                                        <GrNotes className="text-gray-500 hover:text-white" />
                                    </button>
                                </div>
                            </div>

                            {showNotes[lesson.title] && (
                                <textarea
                                    rows={3}
                                    value={notes[lesson.title] || ""}
                                    onChange={(e) =>
                                        handleNotesChange(lesson.title, e.target.value)
                                    }
                                    className="mt-3 w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 resize-none"
                                    placeholder="Write your notes here..."
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
