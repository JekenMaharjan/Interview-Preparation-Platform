import React from 'react'
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiMaterialdesignicons } from "react-icons/si";

const Topics = () => {
    const topics = [
        {
            icon: <FaReact className='h-7 w-7 text-purple-700 dark:text-purple-300'/>,
            name: 'React',
            completion: '0 of 8 topics completed',
        },
        {
            icon: <IoLogoJavascript className='h-7 w-7 text-purple-700 dark:text-purple-300'/>,
            name: 'JavaScript',
            completion: '0 of 8 topics completed',
        },
        {
            icon: <FaGitAlt className='h-7 w-7 text-purple-700 dark:text-purple-300'/>,
            name: 'Git',
            completion: '0 of 6 topics completed',
        },
        {
            icon: <SiMysql className='h-7 w-7 text-purple-700 dark:text-purple-300'/>,
            name: 'SQL',
            completion: '0 of 7 topics completed',
        },
        {
            icon: <SiMaterialdesignicons className='h-7 w-7 text-purple-700 dark:text-purple-300'/>,
            name: 'System Design',
            completion: '0 of 8 topics completed',
        },
    ];
    
    return (
        <div className='flex flex-wrap gap-6 mt-6 justify-center md:justify-start'>
            {topics.length === 0 ? (
                <p className="text-gray-500">No topics available.</p>
            ) : (
                topics.map((topic, index) => (
                    <div
                        key={index}
                        className='flex flex-col w-full sm:w-80 cursor-pointer hover:shadow-md border border-gray-300 dark:border-gray-700 p-5 shadow-sm rounded-xl bg-white dark:bg-gray-800'
                    >
                        <div className='flex justify-between items-center mb-4'>
                            <div className='flex items-center gap-4'>
                                <div className='flex p-3 bg-purple-100 dark:bg-purple-900 rounded-xl shrink-0'>
                                    {topic.icon || <div className="h-7 w-7 bg-gray-300 rounded-full" />}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-md font-bold leading-tight'>{topic.name}</p>
                                    <p className='text-sm text-gray-400 mt-1'>{topic.completion}</p>
                                </div>
                            </div>
                            <div className='font-bold text-purple-600 text-lg'>
                                0%
                            </div>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div
                                className='bg-purple-600 h-2 rounded-full'
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Topics