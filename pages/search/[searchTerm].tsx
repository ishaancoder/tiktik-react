import axios from 'axios';
import React, { useState } from 'react'
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import NoResults from "../../components/NoResults"
import { useRouter } from 'next/router';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

const searchTerm = ({videos}:{videos:Video[]}) => {
   const [showUserVideos, setShowUserVideos] = useState(false)
   const { allUsers } = useAuthStore()
   const router = useRouter()

   const { searchTerm }:any = router.query

   const searchedAccounts = allUsers.filter((user:IUser) => user?.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    console.log(searchedAccounts)

  const videosClassName= showUserVideos ? `border-b-2 border-black`: "text-gray-400"
  const liked= !showUserVideos ? `border-b-2 border-black`: "text-gray-400"
    console.log(videos);
  return (
    <div className="w-full">
        <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
            <p className={`text-xl font-semibold cursor-pointer  mt-2 ${videosClassName} ` }onClick={() => setShowUserVideos(true)}  >Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer  mt-2 ${liked} ` }onClick={() => setShowUserVideos(false)}  >Videos</p> 
          </div>
          {showUserVideos ? (
                <div className="md:mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user:IUser,id:number) => (
                            <Link href={`/profile/${user._id}`} key={id}>
                        <div className='flex items-start gap-3 font-semibold border-b-2 border-gray-200 rounded cursor-pointer m-15'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                        ))
                    ):(
                        <NoResults text={`No Accounts results for ${searchTerm}`} />

                    )}
                </div>
          ) : (
              <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start ">
                  {videos.length ? (
                      videos.map((video:Video,id:number) => (
                            <VideoCard post={video} key={id} />
                      ))
                  ) :(
                      <NoResults text={`No Video results for ${searchTerm}`} />
                  )}
              </div>
          )}
    </div>
  )
}
export const getServerSideProps = async ({ params:{searchTerm} }:{ params:{ searchTerm:string} }) => {

      const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { 
            videos:res.data
        }
    }
}
export default searchTerm