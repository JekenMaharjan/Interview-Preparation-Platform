import DailyLog from '@/components/DailyLog'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import React from 'react'

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
                    header="Today's Log"
                    subheader={todaydate}
                />
                <DailyLog />
            </main>
        </div>
    )
}

export default dailyLog