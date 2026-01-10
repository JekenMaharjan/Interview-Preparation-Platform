import Header from '@/components/Header'
import NotesReflections from '@/components/NotesReflections'
import RecentActivity from '@/components/RecentActivity'
import Sidebar from '@/components/Sidebar'
import StudyToday from '@/components/StudyToday'
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
            <main className="ml-56 pt-6 p-6">
                <Header
                    header="Today's Log"
                    subheader={todaydate}
                />
                <StudyToday />
                <NotesReflections />
                <RecentActivity />
            </main>
        </div>
    )
}

export default dailyLog