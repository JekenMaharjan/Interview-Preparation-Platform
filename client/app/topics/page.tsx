import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ToggleBar from '@/components/ToggleBar'
import Topics from '@/components/Topics'
import React from 'react'
import { IoBookOutline } from 'react-icons/io5'

const topics = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <ToggleBar />
            <Sidebar />

            <main className="ml-56 pt-25 p-6">
                <Header
                    icon={<IoBookOutline className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                    header="Topics"
                    subheader="Explore and manage your topics"
                />
                <Topics />
            </main>
        </div>
    )
}

export default topics