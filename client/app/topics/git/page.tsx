"use client"

import React from 'react'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const topics = () => {

    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-60 pt-25 p-6">
                <p
                    onClick={handleBack}
                    className='flex items-center text-gray-500 text-sm cursor-pointer hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'>
                    <MdOutlineKeyboardBackspace className="w-5 h-5 inline mr-2" />
                    Back to Topics
                </p>
                <div>

                </div>
            </main>
        </div>
    )
}

export default topics