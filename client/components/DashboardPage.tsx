import React from 'react'
import Topics from './Topics'
import { GiProgression } from "react-icons/gi";
import CircularProgress from './CircularProgress';

const DashboardPage = () => {

    const infoCards = [
        {
            about: 'Completed',
            completed: '5',
            outOf: '37',
            icon: <GiProgression className='w-5 h-5 text-purple-700'/>,
        },
        {
            about: 'In Progress',
            completed: '3',
            outOf: 'topics active',
            icon: <GiProgression className='w-5 h-5 text-purple-700'/>,
        },
        {
            about: 'Not Started',
            completed: '4',
            outOf: 'topics remaining',
            icon: <GiProgression className='w-5 h-5 text-purple-700'/>,
        },
    ];

    return (
        <div>
            <div className="flex items-center dark:border-gray-600 dark:bg-gray-800 justify-center h-45 bg-white border-gray-300 rounded-xl border mb-5">
                <CircularProgress value={8} />
            </div>


            <div className="flex gap-4 mb-5">
                {infoCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex gap-6 p-5 px-6 pb-8 border bg-white hover:shadow-md border-gray-300 rounded-xl"
                    >
                        <div className="flex flex-col">
                            <div className="font-semibold text-sm text-gray-500 mb-4">
                                {card.about}
                            </div>

                            <div className="text-black text-3xl font-bold">
                                {card.completed}
                            </div>

                            <div className="text-gray-500 text-sm">
                                {card.outOf === '37' ?  card.outOf && `of ${card.outOf} topics`  : card.outOf}
                                
                            </div>
                        </div>

                        <div className="flex bg-purple-200 p-3 h-13 w-13 rounded-2xl justify-center items-center">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>


            <div className='flex items-center border dark:border-gray-600 gap-6 p-6 dark:bg-purple-200/20 bg-purple-100 border-gray-300 rounded-xl mb-7 w-full h-30'>
                <div className='flex justify-center items-center bg-purple-300 p-5 w-20 h-20 rounded-full'>
                    <GiProgression  className='text-purple-600 w-7 h-7'/>
                </div>
                <div>
                    <p className='font-semibold dark:text-white text-md mb-2'>
                        Keep Going!
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                        Great Progress! Stay focused and keep learning.
                    </p>
                    <p className='text-sm text-purple-600 dark:text-purple-500'>
                        You've logged 1 study session so far!
                    </p>
                </div>
            </div>

            <p className='font-semibold text-lg'>Categories</p>
            <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
                <Topics />
            </div>
        </div>
    )
}

export default DashboardPage