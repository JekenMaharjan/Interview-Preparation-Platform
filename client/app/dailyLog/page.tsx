import DailyLog from '@/components/DailyLog'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import React from 'react'
import { SlCalender } from 'react-icons/sl'

const dailyLog = () => {

    const todaydate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />
            <main className="ml-56 pt-25 p-6">
                <Header
                    icon={<SlCalender className="w-5 h-5 text-purple-700 dark:text-gray-200" />}
                    header="Today's Log"
                    subheader={todaydate}
                />
                <DailyLog />
            </main>
        </div>
    )
}

export default dailyLog