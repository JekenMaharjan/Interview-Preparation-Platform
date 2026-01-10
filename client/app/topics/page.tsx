import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import Topics from '@/components/Topics'
import React from 'react'

const topics = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-56 pt-25 p-6">
                <Header
                    header="Topics"
                    subheader="Explore and manage your topics"
                />
                <Topics />
            </main>
        </div>
    )
}

export default topics