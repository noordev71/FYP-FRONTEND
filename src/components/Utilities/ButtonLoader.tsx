import React from 'react'

export default function ButtonLoader() {
    return (
        <div className="flex">
            <div className="animate-spin inline-block w-5 h-5 mr-3 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-white" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            Processing
        </div>

    )
}
