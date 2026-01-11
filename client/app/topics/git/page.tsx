"use client"

import React from 'react'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaGitAlt } from 'react-icons/fa';

const topics = () => {

    const topicLesson = [
        { title: 'git init', state: 'Not Started' },
        { title: 'git clone', state: 'In Progress' },
        { title: 'git add', state: 'Completed' },
        { title: 'git commit', state: 'Not Started' },
        { title: 'git push', state: 'Not Started' },
        { title: 'git pull', state: 'Not Started' },
        { title: 'git merge', state: 'Not Started' },
        { title: 'git rebase', state: 'Not Started' },
        { title: 'git stash', state: 'Not Started' },
        { title: 'git branch', state: 'Not Started' },
        { title: 'git checkout', state: 'Not Started' },
    ];

    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-60 pt-25 p-6">
                {/* Go Back */}
                <p
                    onClick={handleBack}
                    className='flex mb-5 items-center text-gray-500 text-sm cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'>
                    <MdOutlineKeyboardBackspace className="w-5 h-5 inline mr-2" />
                    Back to Topics
                </p>

                {/* Topic Details */}
                <div className='flex flex-col w-full dark:border-gray-700 rounded-xl dark:bg-gray-800'
                >
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center gap-4'>
                            <div className='flex p-3 bg-purple-100 dark:bg-purple-900 rounded-xl shrink-0'>
                                <FaGitAlt className='h-7 w-7 text-purple-700 dark:text-purple-300' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-xl font-bold leading-tight'>
                                    Git
                                </p>
                                <p className='text-sm text-gray-500 mt-1'>
                                    0 of 6 topics completed
                                </p>
                            </div>
                        </div>
                        <div className='font-bold text-purple-600 text-lg text-end'>
                            <p className='text-2xl'>
                                0%
                            </p>
                            <p className='text-gray-500 font-normal text-sm'>
                                Completed
                            </p>

                        </div>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                        <div
                            className='bg-purple-600 h-2 rounded-full'
                            style={{ width: '0%' }}
                        ></div>
                    </div>
                </div>

                {/* All Topics Informations and Lessons will be displayed here. */}
                <div className='mt-7'>
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4'>
                        {topicLesson.map((lesson, index) => (
                            <div
                                key={index}
                                className='flex justify-between p-5 bg-white dark:bg-gray-800 rounded-lg shadow'
                            >
                                <div className='flex gap-4'>
                                    {/* Checkbox to mark as done */}
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 cursor-pointer 
                                    appearance-none rounded-full
                                    border-2 border-purple-500
                                    checked:bg-purple-500
                                    checked:border-purple-500"
                                    />

                                    {/* Title and State */}
                                    <p className='font-semibold font-sans'>
                                        {lesson.title}
                                    </p>
                                </div>

                                {/* State of the lesson */}
                                <p className='text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full'>
                                    {lesson.state}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default topics