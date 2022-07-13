import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'

const SuggestedAccounts = () => {

  const { fetchAllUsers,allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  },[fetchAllUsers])
  return (
    <div className="pb-4 border-gray-200 xl:border-b-2 ">
      <p className="hidden m-3 mt-4 font-semibold text-gray-500 xl:block ">Suggested Accounts</p>

      <div className="">
        {allUsers?.slice(0,6).map((user :IUser) => (
            <Link href="/profile/[id]" as={`/profile/${user._id}`} key={user._id}>
                  <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer hover:bg-primary">
                    <div className="w-8 h-8 ">
                      <Image className="rounded-full" layout="responsive" src={user.image} width={34} height={34} />
                    </div>

                    <div className="hidden xl:block">
                        <p className="flex items-center gap-1 text-md text-primary lower">
                          {user.userName.replaceAll(" ", "").toLowerCase()}
                          <GoVerified className="text-blue-400"></GoVerified>
                        </p>
                        <p className="text-gray-400 capitalize">
                          {user.userName}
                        </p>
                    </div>
                  </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts