import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import { useRouter } from 'next/router'

import { IUser,Video } from '../../types'
import { BASE_URL } from '../../utils'
import { client } from '../../utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../utils/queries'

interface IProps {
    data: {
        user:IUser,
        userVideos:Video[],
        userLiked:Video[],
    }
}

const Profile = ({ data }:IProps) => {

  
  const [showUserVideos, setShowUserVideos] = useState(false)
  const [videoList, setVideoList] = useState<Video[]>([])

  const videos= showUserVideos ? `border-b-2 border-black`: "text-gray-400"
  const liked= !showUserVideos ? `border-b-2 border-black`: "text-gray-400"

  useEffect(() => {
    
      if(showUserVideos) {
        setVideoList(data.userVideos)
      } else {
        setVideoList(data.userLiked)
        console.log(videoList)
      }
      
  },[showUserVideos,data.userLiked,data.userVideos])


  return (
    <div className="w-full">
        <div className="flex w-full gap-6 mb-4 bg-white md:gap-10">
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer hover:bg-primary">
                    <div className="w-16 h-16 md:w-32 md:h-32 ">
                      <Image className="rounded-full" layout="responsive" src={data.user.image} width={120} height={120} />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="flex items-center justify-center gap-1 tracking-wider text-md md:text-2xl text-primary lower">
                          {data.user.userName.replaceAll(" ", "").toLowerCase()}
                          <GoVerified className="text-blue-400"></GoVerified>
                        </p>
                        <p className="text-gray-400 capitalize md:text-xl">
                          {data.user.userName}
                        </p>
                    </div>
                  </div>
        </div>

        <div className="">
          <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
            <p className={`text-xl font-semibold cursor-pointer  mt-2 ${videos} ` }onClick={() => setShowUserVideos(true)}  >Videos</p>
                        <p className={`text-xl font-semibold cursor-pointer  mt-2 ${liked} ` }onClick={() => setShowUserVideos(false)}  >Liked</p>

    
          </div>
          <div className="flex flex-wrap gap-6 md:justify-start ">
            {videoList?.length > 0 ? (
            videoList.map((post:Video,id:number) => (
                              <VideoCard post={post} key={id}></VideoCard>
            ))            
            )  : <NoResults text={`No ${showUserVideos ? "" :"Liked"} Videos`} />
            
            }
            
          </div>
        </div>
    </div>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id:"106259769714971591941" } }
//     ],
//     fallback: true // false or 'blocking'
//   };
// }


export const getServerSideProps = async ({ params:{userId} }:{ params:{ userId:string} }) => {

      const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

    return {
        props: { 
            data:res.data
        }
    }
}

export default Profile