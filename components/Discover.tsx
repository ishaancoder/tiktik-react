import React from 'react'
import {useRouter } from 'next/router'
import Link from 'next/link'

import { topics } from '../utils/constants'

const Discover = () => {

    const router = useRouter() 
    
    const { topic } = router.query
    

    const activeTopicStyle = `
        xl:border-2 hover:bg-primary xl:border-[#F51997] py-2 px-4 rounded xl:rounded-full
        flex items-center gap-2 justify-center cursor-pointer text-[#F51997]
    `
    const topicStyle = `xl:border-2 hover:bg-primary xl:border-gray-300 py-2 px-4 rounded xl:rounded-full
        flex items-center gap-2 justify-center cursor-pointer text-black
    `
  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
        <p className="hidden m-3 mt-4 font-semibold text-gray-500 xl:block">Popular Topics</p>
        <div className="flex flex-wrap gap-3">
            {
                topics.map(items => (
                    <Link href={`/?topic=${items.name}`} key={items.name}>
                            <div className={topic === items.name ? activeTopicStyle : topicStyle}>
                                <span className="text-2xl font-bold xl-text-md ">
                                    {items.icon}
                                </span>
                                <span className="hidden font-medium capitalize text-md xl:block">
                                    {items.name}
                                </span>
                            </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Discover