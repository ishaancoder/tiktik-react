import Link from 'next/link'
import React from 'react'

import { footerList2,footerList3,footerList1 } from "../utils/constants"

const List = ({ items,mt }:{ items:string[],mt:boolean })=> (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5" }`}>
            {items.map(item => (
                <p key={item} className="text-sm text-gray-400 cursor-pointer hover:underline ">
                    {item}
                </p>
            ))}
        </div>
)

const Footer = () => {
  return (
    <div className="hidden mt-6 xl:block ">
        <div className="flex flex-wrap gap-2 mt-5">
            <List items={footerList1} mt={false}></List>
            <List items={footerList2} mt></List>
            <List items={footerList3} mt></List>
            <p className="mt-5 text-sm text-gray-400 ">2022Tiktik </p>

        </div>
    </div>
  )
}

export default Footer