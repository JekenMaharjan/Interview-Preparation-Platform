import React from 'react'
import { LuSave } from "react-icons/lu";

const NotesReflections = () => {
    return (
        <div className='border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg p-7 my-6'>
            <div>
                <p className='font-semibold'>Notes & Reflections</p>
                <textarea
                    className='w-full text-sm h-40 mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='What did you learn today? Any challenges or breakthroughs?'
                ></textarea>
            </div>
            <div className='flex justify-center'>
                <button className="mt-2 flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition">
                    <LuSave /> Save Today's Log
                </button>
            </div>
        </div>
    )
}

export default NotesReflections